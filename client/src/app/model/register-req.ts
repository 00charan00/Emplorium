export class RegisterReq {
  private staffName:String;
  private staffEmail:String;
  private staffPass:String;


  constructor(staffName: String, staffEmail: String, staffPass: String) {
    this.staffName = staffName;
    this.staffEmail = staffEmail;
    this.staffPass = staffPass;
  }


  get getStaffName(): String {
    return this.  staffName;
  }

  get getStaffEmail(): String {
    return this.staffEmail;
  }

  get getStaffPass(): String {
    return this.staffPass;
  }
}

export const enum StaffRole {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_EMPLOYEE = "ROLE_EMPLOYEE"
}
