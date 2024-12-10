export class MeetingDto {
  meetingName: string;
  meetingDescription: string;
  empIdList: Array<string>;
  meetingDateTime: string;
  meetingLink: string;
  meetingOwner: string;


  constructor(meetingName: string, meetingDescription: string, empIdList: Array<string>, meetingDateTime: string, meetingLink: string, meetingOwner: string) {
    this.meetingName = meetingName;
    this.meetingDescription = meetingDescription;
    this.empIdList = empIdList;
    this.meetingDateTime = meetingDateTime;
    this.meetingLink = meetingLink;
    this.meetingOwner = meetingOwner;
  }
}
