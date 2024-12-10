import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {StaffService} from '../../service/staff.service';
import {AdminStaffDto} from '../../model/admin-staff-dto';

@Component({
  selector: 'app-staff-add',
  imports: [
    FormsModule
  ],
  templateUrl: './staff-add.component.html',
})
export class StaffAddComponent {
  staff = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  constructor(private staffService:StaffService) {
  }

  onSubmit() {
    this.staffService.addNewStaffByAdmin(new AdminStaffDto(
      this.staff.name,
      this.staff.email,
      this.staff.password,
      this.staff.role,
    )).subscribe(res =>{
      console.log(res);
    })
    console.log('Employee Data:', this.staff);
  }

}
