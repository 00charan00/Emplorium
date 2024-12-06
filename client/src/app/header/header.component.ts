import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

    protected readonly localStorage = localStorage;

  logout() {
    localStorage.clear();
  }
}
