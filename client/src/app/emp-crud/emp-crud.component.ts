import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Staff} from '../model/staff';
import {StaffService} from '../service/staff.service';

@Component({
  selector: 'app-emp-crud',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './emp-crud.component.html'
})
export class EmpCrudComponent implements OnInit{

  staffs?:Staff[];

  constructor(private staffService:StaffService) {
  }

  ngOnInit(): void {
    this.staffService.getAllStaff()
      .subscribe(res => {
        this.staffs = res;
      });
  }

  openUserEdit() {



  }

  deleteStaff(staffId: string) {
    this.staffService.deleteStaff(staffId).subscribe(res=>{
      console.log(res);
    });

  }
}
