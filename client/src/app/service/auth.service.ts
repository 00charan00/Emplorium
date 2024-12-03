import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;
  private isAdmin: boolean = false;

  constructor(private router: Router) {
    this.loggedIn = (localStorage.getItem("username") != null && localStorage.getItem("password") != null)
  }

  // Call this method when the user successfully logs in
  login(mail:string,pass:string): void {
    this.loggedIn = true;
    this.saveCredentials(mail, pass);
    this.router.navigate(['']);
  }

  adminLogin(mail:string,pass:string){
    this.loggedIn = true;
    this.isAdmin = true;
    this.saveCredentials(mail, pass);
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
  saveCredentials(userName:string, password:string){
    localStorage.setItem("username",userName);
    localStorage.setItem("password",password);
  }

}
