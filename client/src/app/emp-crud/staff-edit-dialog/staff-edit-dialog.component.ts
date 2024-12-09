import {Component, Inject, OnInit} from '@angular/core';
import {Staff} from '../../model/staff';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {data} from 'autoprefixer';
import {StaffService} from '../../service/staff.service';
import {RegisterReq} from '../../model/register-req';

@Component({
  selector: 'app-staff-edit-dialog',
  imports: [
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './staff-edit-dialog.component.html',
})
export class StaffEditDialogComponent implements OnInit{

  private staff:Staff;

  editStaffForm = new FormGroup({
    staffName : new FormControl(''),
    staffEmail : new FormControl(''),
    staffPassword : new FormControl(''),
  })

  constructor(@Inject(MAT_DIALOG_DATA)public data:{staffDet: Staff}, private staffService:StaffService) {
      this.staff = data.staffDet
  }

  updateStaff(){
    let editedStaffName = this.editStaffForm.controls.staffName.value
    let editedSatffEmail = this.editStaffForm.controls.staffEmail.value
    let editedSatffPass = this.editStaffForm.controls.staffPassword.value
    if(editedSatffEmail != null && editedStaffName != null && editedSatffPass != null) {
      this.staffService.updateStaff(this.staff.staffId,
        new RegisterReq(
          editedStaffName,
          editedSatffEmail,
          editedSatffPass
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
