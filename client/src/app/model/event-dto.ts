export class EventDto {
  eventName:String;
  eventVenue:String;
  eventDate:String;
  eventDescription:String;

  constructor(eventName: String, eventVenue: String, eventDate: String, eventDescription: String) {
    this.eventName = eventName;
    this.eventVenue = eventVenue;
    this.eventDate = eventDate;
    this.eventDescription = eventDescription;
  }

}
