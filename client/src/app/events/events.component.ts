import {Component, OnInit} from '@angular/core';
import {EventsService} from '../service/events.service';
import {Events} from '../model/event';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe, formatDate, NgClass, NgIf} from '@angular/common';
import {EventDto} from '../model/event-dto';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-events',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
    NgIf,
    MatIcon,
    MatIconButton,
    MatTooltip,
    NgClass
  ],
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {
  currentDateTime: string;
  currentDateTimeDisplay: string;

  events?: Events[];
  showToast = false;
  toastMessage = 'Event added successfully!';

  eventForm = new FormGroup({
    eventName: new FormControl(''),
    eventLocation: new FormControl(''),
    eventDate: new FormControl(new Date()),
    eventDescription: new FormControl(''),
  });

  constructor(private eventService: EventsService, private datePipe: DatePipe) {
    this.currentDateTime = this.getCurrentDateTime();
    this.currentDateTimeDisplay = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss') || '';
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  postEvent(): void {
    const name = this.eventForm.controls.eventName.value;
    const location = this.eventForm.controls.eventLocation.value;
    const date = this.eventForm.controls.eventDate.value;
    const desc = this.eventForm.controls.eventDescription.value;

    if (name && location && date && desc) {
      const formattedDate = formatDate(date, 'dd-MM-yyyy HH:mm a', 'en-US');
      let uname = localStorage.getItem('username');
      if (uname != null) {
        const event = new EventDto(name, location, formattedDate, desc, uname);

        this.eventService.postEvent(event).subscribe(
          res => {
            console.log(res);
            this.showToastMessage('Event added successfully!');
            this.eventForm.reset();
            // Clear the form
            this.loadEvents(); // Reload the events list
          },
          err => {
            console.error(err);
            this.showToastMessage('Failed to add event. Please try again.');
          }
        );
      } else {
        this.showToastMessage('Please fill out all the fields.');
      }
    }
  }

  showToastMessage(message: string): void {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000); // Toast disappears after 3 seconds
  }

    protected readonly localStorage = localStorage;

  cancelEvent(eventId: String) {
    this.eventService.cancelEvent(eventId)
      .subscribe(res=>{
        console.log(res);
      })
  }
}
