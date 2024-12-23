import {Team} from './team';

export interface StaffTask {
  taskId:string;
  taskTittle:string;
  taskDescription:string;
  team:Team;
  modules:string[];
  moduleLevelProgress:Map<string,ProgressStatus>;
  taskProgress:ProgressStatus;
  progressPercent:number;
  teamAssigned:boolean;
  progressDetails:ProgressInfo[];
  deadline:string;
}

export interface ImageDetail {
  imageId:string;
  imageName:string;
  image:any;
}

export interface ProgressInfo {
  progressInfoId:string
  comment:string;
  updatedTime:string;
  updatedUser:string
  references:ImageDetail[];
  progressStatus:string;
}

export enum ProgressStatus{
  INITIATED,
  IN_PROGRESS,
  DONE,
  IN_REVIEW,
  APPROVED,
  REJECTED
}
