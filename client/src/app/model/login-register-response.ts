import {StaffRole} from './register-req';

export interface LoginRegisterResponse {
  msg:string;
  status:boolean;
  role:StaffRole;
  userName:string;
}
