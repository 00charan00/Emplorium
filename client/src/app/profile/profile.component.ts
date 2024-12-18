import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditComponent } from '../profile/profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{

  protected readonly localStorage = localStorage;

  userName: string = '';
  userEmail: string = '';
  userPassword = '********';
  userRole = 'Employee';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    const storedRole = localStorage.getItem('userRole');

    console.log('Stored Name:', storedName);
    console.log('Stored Email:', storedEmail);

  }
  openEditDialog() {
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      data: {
        staffDet: {
          staffName: this.userName,
          staffEmail: this.userEmail,
          staffPassword: this.userPassword,
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userName = result.staffName;
        this.userEmail = result.staffEmail;
        this.userPassword = result.staffPassword;

        localStorage.setItem('userName', this.userName);
        localStorage.setItem('userEmail', this.userEmail);
        localStorage.setItem('userPassword', this.userPassword);
      }
    });
  }
}