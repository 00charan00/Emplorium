import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {EmpCrudComponent} from '../emp-crud/emp-crud.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  imports: [
    RouterLink,
    EmpCrudComponent
  ],
})
export class AdminHomeComponent {}
