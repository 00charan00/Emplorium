import {Staff} from './staff';

export interface Team {
  teamId:string;
  teamName:string;
  teamMembers:Staff[];
  teamLeader:Staff;
}
