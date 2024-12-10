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

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  constructor(private route:Router,private authService:AuthService) {

  }
    protected readonly localStorage = localStorage;

  logout() {
    this.authService.exitAuth()
    this.route.navigate(['']);
  }
}
