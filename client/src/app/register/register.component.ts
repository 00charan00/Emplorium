// import {Component} from '@angular/core';
// import {Router, RouterLink} from '@angular/router';
// import {FormsModule} from '@angular/forms';
// import {StaffService} from '../service/staff.service';
// import {RegisterReq, StaffRole} from '../model/register-req';
// import {AuthService} from '../service/auth.service';
//
// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   imports: [
//     FormsModule,
//     RouterLink
//   ]
// })
// export class RegisterComponent {
//   name: string = '';
//   email: string = '';
//   password: string = '';
//
//   constructor(private router: Router,private staffServer:StaffService,private authService:AuthService) {}
//
//   register() {
//
//     if(this.name != '' && this.email != '' && this.password != ''){
//       this.staffServer.registerStaff(
//         new RegisterReq(
//           this.name,
//           this.email,
//           this.password
//         )
//       ).subscribe(res => {
//         if(res.status){
//           if(res.role == StaffRole.ROLE_ADMIN){
//             this.authService.adminLogin(this.email,this.password,res.userName,res.role,res.msg);
//           }else if(res.role == StaffRole.ROLE_EMPLOYEE || res.role === StaffRole.ROLE_TL){
//             this.authService.login(this.email,this.password,res.userName,res.role,res.msg);
//           }
//         }else{
//           console.log(false)
//         }
//       })
//     }
//   }
// }



import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StaffService } from '../service/staff.service';
import { RegisterReq, StaffRole } from '../model/register-req';
import { AuthService } from '../service/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule, RouterLink, NgIf],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private staffService: StaffService,
    private authService: AuthService
  ) {}

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  register() {
    if (this.name === '') {
      // alert('Name is required.');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      // alert('Please enter a valid email.');
      return;
    }

    if (!this.isValidPassword(this.password)) {
      //alert(
      //  'Password must be at least 8 characters long, include at least one number and one special character.'
      //);
      return;
    }

    this.staffService
      .registerStaff(new RegisterReq(this.name, this.email, this.password))
      .subscribe((res) => {
        if (res.status) {
          if (res.role === StaffRole.ROLE_ADMIN) {
            this.authService.adminLogin(
              this.email,
              this.password,
              res.userName,
              res.role,
              res.msg
            );
          } else if (
            res.role === StaffRole.ROLE_EMPLOYEE ||
            res.role === StaffRole.ROLE_TL
          ) {
            this.authService.login(
              this.email,
              this.password,
              res.userName,
              res.role,
              res.msg
            );
          }
        } else {
          console.log('Registration failed.');
        }
      });
  }
}
