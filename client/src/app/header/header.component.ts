// import { Component } from '@angular/core';
// import {Router, RouterLink} from '@angular/router';
// import {NgIf} from '@angular/common';
// import {AuthService} from '../service/auth.service';
//
// @Component({
//   selector: 'app-header',
//   imports: [RouterLink, NgIf],
//   templateUrl: './header.component.html',
// })
// export class HeaderComponent {
//   menuOpen = false;
//
//   toggleMenu() {
//     this.menuOpen = !this.menuOpen;
//   }
//   constructor(private route:Router,private authService:AuthService) {
//
//   }
//     protected readonly localStorage = localStorage;
//
//   logout() {
//     this.authService.exitAuth()
//     this.route.navigate(['']);
//   }
// }


import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  menuOpen = false;
  profileMenuOpen = false;

  constructor(private route: Router, private authService: AuthService) {}

  protected readonly localStorage = localStorage;
  // ngOnInit(): void {
  //
  //   const storedName = localStorage.getItem('userName');
  //   const storedEmail = localStorage.getItem('userEmail');
  //
  //   console.log('Stored Name:', storedName);
  //   console.log('Stored Email:', storedEmail);
  //
  // }


//  profilepage
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  editProfile() {
    // Navigate to the edit profile page
    this.route.navigate(['/profile']);
  }

  logout() {
    this.authService.exitAuth();
    this.route.navigate(['']);
  }

}

