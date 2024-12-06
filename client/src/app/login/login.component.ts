import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterReq, StaffRole } from '../model/register-req';
import { StaffService } from '../service/staff.service';
import { AuthService } from '../service/auth.service';
import { LoginRegisterResponse } from '../model/login-register-response';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, NgIf, RouterLink]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Variable to hold the error message

  constructor(
    private router: Router,
    private staffService: StaffService,
    private authService: AuthService
  ) {}

  login() {
    // Clear previous error message
    this.errorMessage = '';

    if (this.email !== '' && this.password !== '') {
      this.staffService
        .loginStaff(new RegisterReq('', this.email, this.password))
        .subscribe({
          next: (value) => {
            const role = value.role;
            if (value.status) {
              if (role === StaffRole.ROLE_EMPLOYEE) {
                this.authService.login(this.email, this.password, value.userName);
              } else if (role === StaffRole.ROLE_ADMIN) {
                this.authService.adminLogin(this.email, this.password, value.userName);
              }
            } else {
              this.errorMessage = value.msg;
            }
          },
          error: (err) => {
            this.errorMessage = err.error.msg;
            console.log(err.error.msg);
          }
        });
    } else {
      this.errorMessage = 'Email and password are required';
    }
  }
}
