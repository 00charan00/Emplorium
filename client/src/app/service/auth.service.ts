import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;
  private isAdmin: boolean = false;

  constructor(private router: Router) {
    this.loggedIn = (localStorage.getItem("username") != null && localStorage.getItem("password") != null);
    this.isAdmin = this.loggedIn && (localStorage.getItem("name") == "Admin");
    console.log(this.loggedIn);
  }

  // Call this method when the user successfully logs in
  login(mail:string,pass:string,username:string,role:string,msg:string): void {
    this.loggedIn = true;
    this.saveCredentials(mail, pass, username,role,msg);
    this.router.navigate(['']);
  }

  adminLogin(mail:string,pass:string, username:string,role:string,msg:string){
    this.loggedIn = true;
    this.isAdmin = true;
    this.saveCredentials(mail, pass,username,role,msg);
    this.router.navigate(['/admin'])
  }
  // Call this method when the user logs out
  logout(): void {
    this.loggedIn = false;
    this.router.navigate(['/login']);  // Redirect to login page
  }

  // Check if the user is logged in
  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  isAdministrator():boolean{
    return this.isAdmin;
  }
  saveCredentials(userName:string, password:string, name:string, role:string,msg:string){
    localStorage.setItem("username",userName);
    localStorage.setItem("name",name);
    localStorage.setItem("password",password);
    localStorage.setItem("role",role);
    localStorage.setItem("id",msg);
  }

  exitAuth() {
    this.loggedIn=false;
    this.isAdmin=false;
    localStorage.clear();

  }
}
