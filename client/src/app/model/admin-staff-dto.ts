import {StaffRole} from './register-req';

export class AdminStaffDto {
   staffName:String;
   staffEmail:String;
   staffPass:String;
   staffRole:String;

  constructor(staffName: String, staffEmail: String, staffPass: String, staffRole: String) {
    this.staffName = staffName;
    this.staffEmail = staffEmail;
    this.staffPass = staffPass;
    this.staffRole = staffRole;
  }
}
