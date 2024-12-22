export class EventDto {
  eventName:String;
  eventVenue:String;
  eventDate:String;
  eventDescription:String;
  eventPoster:string;

  constructor(eventName: String, eventVenue: String, eventDate: String, eventDescription: String,eventPoster:string) {
    this.eventName = eventName;
    this.eventVenue = eventVenue;
    this.eventDate = eventDate;
    this.eventDescription = eventDescription;
    this.eventPoster = eventPoster;
  }

}
