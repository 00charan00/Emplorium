import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-staff-add',
  imports: [
    FormsModule
  ],
  templateUrl: './staff-add.component.html',
})
export class StaffAddComponent {
  employee = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  onSubmit() {
    console.log('Employee Data:', this.employee);
  }

}
