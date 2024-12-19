import { Component, Inject, inject, OnInit } from '@angular/core';
import {NgClass, NgOptimizedImage} from '@angular/common';
import { Staff } from '../model/staff';
import { StaffService } from '../service/staff.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StaffEditDialogComponent } from './staff-edit-dialog/staff-edit-dialog.component';
import { StaffAddComponent } from './staff-add/staff-add.component';

@Component({
  selector: 'app-emp-crud',
  imports: [NgOptimizedImage, NgClass],
  templateUrl: './emp-crud.component.html',
})
export class EmpCrudComponent implements OnInit {
  staffs?: Staff[];
  dialog = inject(MatDialog);

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.staffService.getAllStaff().subscribe((res) => {
      this.staffs = this.sortStaffs(res);
    });
  }

  // Sorting logic: ROLE_ADMIN first, then ROLE_EMPLOYEE, and sort alphabetically by name
  private sortStaffs(staffList: Staff[]): Staff[] {
    return staffList.sort((a, b) => {
      // Prioritize ROLE_ADMIN over ROLE_EMPLOYEE
      if (a.staffRole === 'ROLE_ADMIN' && b.staffRole !== 'ROLE_ADMIN') return -1;
      if (b.staffRole === 'ROLE_ADMIN' && a.staffRole !== 'ROLE_ADMIN') return 1;

      // If roles are the same, sort alphabetically by staffName
      return a.staffName.localeCompare(b.staffName);
    });
  }

  openUserEdit(staff: Staff) {
    this.dialog.open(StaffEditDialogComponent, {
      data: { staffDet: staff },
    });
  }

  deleteStaff(staffId: string) {
    this.staffService.deleteStaff(staffId).subscribe((res) => {
      console.log(res);
      // Update the list after deletion
      this.staffs = this.staffs?.filter((staff) => staff.staffId !== staffId);
    });
  }

  addNewStaff() {
    this.dialog.open(StaffAddComponent);
  }
}
