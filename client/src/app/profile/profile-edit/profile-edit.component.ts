import {Component, Inject, OnInit} from '@angular/core';
import {Staff} from '../../model/staff';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StaffService} from '../../service/staff.service';
import {RegisterReq, StaffRole} from '../../model/register-req';
import {AuthService} from '../../service/auth.service';

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

  constructor(@Inject(MAT_DIALOG_DATA)public data:{staffDet: Staff}, private staffService:StaffService,private authService:AuthService) {
    this.staff = data.staffDet
  }

  updateStaff(){
    let editedStaffName = this.editStaffForm.controls.staffName.value;
    let editedStaffEmail = this.editStaffForm.controls.staffEmail.value;
    let editedStaffPass = this.editStaffForm.controls.staffPassword.value;
    let staffPassChecked = editedStaffPass == null ? '' : editedStaffPass;
    let staffNameChecked = editedStaffName == null ? '' : editedStaffName;
    let staffEmailChecked = editedStaffEmail == null ? '' : editedStaffEmail;

      this.staffService.updateStaffByUser(this.staff.staffId,new RegisterReq(staffNameChecked,staffEmailChecked,staffPassChecked))
        .subscribe(res =>{
          console.log(res);
          let newPassword = (staffPassChecked == null || staffPassChecked == '') ? this.staff.staffPass : staffPassChecked;
          this.refreshCredentials(res.staffName, res.staffEmail, newPassword);
        });

  }

  ngOnInit(): void {
    this.editStaffForm.setValue({
      staffName: this.staff.staffName,
      staffEmail: this.staff.staffEmail,
      staffPassword: this.staff.staffPass
    })

  }

  refreshCredentials(editedStaffName:string, editedStaffEmail:string, editedStaffPass:string){
    this.staffService
      .loginStaff(new RegisterReq(editedStaffName, editedStaffEmail, editedStaffPass))
      .subscribe({
        next: (value) => {
          const role = value.role;
          if (value.status) {
            if (role === StaffRole.ROLE_EMPLOYEE|| role == StaffRole.ROLE_TL) {
              this.authService.enableUserLoginAndSave(editedStaffEmail, editedStaffPass, value.userName,value.role,value.msg);
            } else if (role === StaffRole.ROLE_ADMIN) {
              this.authService.enableAdminLoginAndSave(editedStaffEmail, editedStaffPass, value.userName,value.role,value.msg);
            }
          } else {
            console.log(value.msg);
          }
        },
        error: (err) => {
          console.log(err.error.msg);
        }
      });
  }
}




