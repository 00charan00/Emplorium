import {Component, OnInit} from '@angular/core';
import {EventsService} from '../service/events.service';
import {Events} from '../model/event';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe, formatDate, NgIf} from '@angular/common';
import {EventDto} from '../model/event-dto';

@Component({
  selector: 'app-events',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
    NgIf
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
      const event = new EventDto(name, location, formattedDate, desc);

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

  showToastMessage(message: string): void {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000); // Toast disappears after 3 seconds
  }
}
