import {StaffRole} from './register-req';

export interface LoginRegisterResponse {
  msg:string;
  status:boolean;
  role:StaffRole;

  // constructor(msg: string, status: boolean, role: StaffRole) {
  //   this.msg = msg;
  //   this.status = status;
  //   this.role = role;
  // }
  //
  // get getMessage(){return this.msg}
  // get getStatus(){return this.status}
  // get getRole(){return this.role}
}
