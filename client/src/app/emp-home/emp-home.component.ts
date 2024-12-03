import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {EventsComponent} from '../events/events.component';

@Component({
  selector: 'app-emp-home',
  templateUrl: './emp-home.component.html',
  imports: [
    RouterLink,
  ],
  styleUrls: ['./emp-home.component.css']
})
export class EmpHomeComponent {}
