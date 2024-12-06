import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {RegisterReq, StaffRole} from '../model/register-req';
import {StaffService} from '../service/staff.service';
import {AuthService} from '../service/auth.service';
import {LoginRegisterResponse} from '../model/login-register-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    RouterLink
  ],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router,private staffServer:StaffService,private authService:AuthService) {}

  login() {
    if(this.email != '' && this.password != ''){
      this.staffServer.loginStaff(
        new RegisterReq(
          '',
          this.email,
          this.password
        )
      ).subscribe({
        next : value => {
          let role = value.role
          console.log(value);
          if(value.status){
            if(role == StaffRole.ROLE_EMPLOYEE){
              this.authService.login(this.email,this.password,value.userName);
            }else if(role == StaffRole.ROLE_ADMIN){
              this.authService.adminLogin(this.email,this.password,value.userName)
            }
          }else{
            console.log(value.msg)
          }
        },
        error : err => {

        }
      })
    }
  }
}
