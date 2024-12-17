export class StaffUpdate {
  private staffName: string;
  private staffEmail: string;
  private staffPass: string;
  private staffRole: string;

  constructor(staffName: string, staffEmail: string, staffPass: string, staffRole: string) {
    this.staffName = staffName;
    this.staffEmail = staffEmail;
    this.staffPass = staffPass;
    this.staffRole = staffRole;
  }


}
