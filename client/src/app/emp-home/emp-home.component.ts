import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {EventsComponent} from '../events/events.component';

@Component({
  selector: 'app-emp-home',
  templateUrl: './emp-home.component.html',
  imports: [
    RouterLink,
  ],
})
export class EmpHomeComponent {}
