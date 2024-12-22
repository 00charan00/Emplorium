export interface Meeting {
  meetingId:string
  meetingName: string;
  meetingDescription: string;
  empIdList: Array<string>;
  meetingDateTime: string;
  meetingLink: string;
  meetingOwner: string;
  meetingStatus:MeetingStatus;

}

export enum MeetingStatus{
  ACTIVE="ACTIVE",
  CANCELLED="CANCELLED",
  COMPLETED="COMPLETED"
}
