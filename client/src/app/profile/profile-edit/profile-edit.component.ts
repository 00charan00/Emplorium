import {Component, Inject, OnInit} from '@angular/core';
import {Staff} from '../../model/staff';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StaffService} from '../../service/staff.service';
import {RegisterReq} from '../../model/register-req';

@Component({
  selector: 'app-profile-edit',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile-edit.component.html'
})
export class ProfileEditComponent implements OnInit{
  private staff:Staff;

  editStaffForm = new FormGroup({
    staffName : new FormControl(''),
    staffEmail : new FormControl(''),
    staffPassword : new FormControl('')
  })

  constructor(@Inject(MAT_DIALOG_DATA)public data:{staffDet: Staff}, private staffService:StaffService) {
    this.staff = data.staffDet
  }

  updateStaff(){
    let editedStaffName = this.editStaffForm.controls.staffName.value
    let editedStaffEmail = this.editStaffForm.controls.staffEmail.value
    let editedStaffPass = this.editStaffForm.controls.staffPassword.value
    if(editedStaffEmail != null && editedStaffName != null && editedStaffPass != null) {
      this.staffService.updateStaffByUser(this.staff.staffId,
        new RegisterReq(
          editedStaffName,
          editedStaffEmail,
          editedStaffPass
        )
      ).subscribe(res => {
        console.log(res);

      })
    }
  }

  ngOnInit(): void {
    this.staff = this.data.staffDet
    this.editStaffForm.controls.staffName.setValue(this.staff.staffName)
    this.editStaffForm.controls.staffEmail.setValue(this.staff.staffEmail)

  }
}




