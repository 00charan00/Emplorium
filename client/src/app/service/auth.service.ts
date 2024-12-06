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
  login(mail:string,pass:string,username:string): void {
    this.loggedIn = true;
    this.saveCredentials(mail, pass, username);
    this.router.navigate(['']);
  }

  adminLogin(mail:string,pass:string, username:string){
    this.loggedIn = true;
    this.isAdmin = true;
    this.saveCredentials(mail, pass,username);
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
  saveCredentials(userName:string, password:string, name:string){
    localStorage.setItem("username",userName);
    localStorage.setItem("name",name);
    localStorage.setItem("password",password);
  }

}
