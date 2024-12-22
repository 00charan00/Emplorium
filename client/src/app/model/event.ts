export interface Events {
  eventId:String;
  eventName:String;
  eventVenue:String;
  eventDate:Date;
  eventDescription:String;
  eventStatus:EventStatus;
  eventPoster:string;
}

export enum EventStatus{
  ACTIVE="ACTIVE",
  CANCELLED="CANCELLED",
  COMPLETED="COMPLETED"
}
