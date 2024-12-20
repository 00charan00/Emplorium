import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditComponent } from '../profile/profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{

  protected readonly localStorage = localStorage;

  userPassword = localStorage.getItem('password');
  storedStaffId = localStorage.getItem('id');
  storedName = localStorage.getItem('name');
  storedEmail = localStorage.getItem('username');

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {

  }
  openEditDialog() {
    this.dialog.open(ProfileEditComponent, {
      data: {
        staffDet: {
          staffName: this.storedName,
          staffEmail: this.storedEmail,
          staffPass: this.userPassword,
          staffId: this.storedStaffId
        }
      }
    });

  }
}
