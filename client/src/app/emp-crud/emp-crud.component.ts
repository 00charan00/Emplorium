import {Component, Inject, inject, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Staff} from '../model/staff';
import {StaffService} from '../service/staff.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {StaffEditDialogComponent} from './staff-edit-dialog/staff-edit-dialog.component';
import {StaffAddComponent} from './staff-add/staff-add.component';

@Component({
  selector: 'app-emp-crud',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './emp-crud.component.html'
})
export class EmpCrudComponent implements OnInit{

  staffs?:Staff[];
  dialog = inject(MatDialog)

  constructor(private staffService:StaffService) {
  }

  ngOnInit(): void {
    this.staffService.getAllStaff()
      .subscribe(res => {
        this.staffs = res;
      });
  }

  openUserEdit(staff:Staff) {
    this.dialog.open(StaffEditDialogComponent,{
      data:{staffDet:staff}
    });
  }

  deleteStaff(staffId: string) {
    this.staffService.deleteStaff(staffId).subscribe(res=>{
      console.log(res);
    });

  }

  addNewStaff() {
    this.dialog.open(StaffAddComponent)
  }
}
