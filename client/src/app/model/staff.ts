import {StaffRole} from './register-req';

export interface Staff {
  staffId:string;
  staffName:string;
  staffEmail:string;
  staffPass:string;
  staffRole:StaffRole;
}
