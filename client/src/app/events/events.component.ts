import {Component, OnInit} from '@angular/core';
import {EventsService} from '../service/events.service';
import {Events} from '../model/event';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe, formatDate} from '@angular/common';
import {EventDto} from '../model/event-dto';


@Component({
  selector: 'app-events',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit{
  currentDateTime: string;
  currentDateTimeDisplay: string;

  events?:Events[];
  eventForm = new FormGroup({
    eventName: new FormControl(''),
    eventLocation: new FormControl(''),
    eventDate: new FormControl(new Date()),
    eventDescription: new FormControl(''),
  })

  constructor(private eventService:EventsService,private datePipe: DatePipe) {
    this.currentDateTime = this.getCurrentDateTime();
    this.currentDateTimeDisplay = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss') || '';
  }
  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      events => {
        this.events = events;
      }
    )
  }

  postEvent(){
    let name = this.eventForm.controls.eventName.value
    let location = this.eventForm.controls.eventLocation.value
    let date = this.eventForm.controls.eventDate.value
    let desc = this.eventForm.controls.eventDescription.value
    if(name != null && name != '' &&
      location != null && location != '' &&
      date != null && desc != null && desc != ''){
      let formattedDate = formatDate(date,"dd-MM-yyyy HH:mm a","en-US")
        let event = new EventDto(name,location,formattedDate,desc);
        this.eventService.postEvent(event).subscribe(
          res => {
            console.log(res);
          }
        )

    }else{
      console.log("fill all details");
    }
  }

}
