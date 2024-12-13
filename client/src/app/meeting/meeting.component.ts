import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MeetingService} from '../service/meeting.service';
import {MeetingDto} from '../model/meetingDto';
import {Meeting} from '../model/meeting';
import {DatePipe, formatDate, NgIf} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';
import {StaffService} from '../service/staff.service';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {StaffBase} from '../model/staff-base';

@Component({
  selector: 'app-meeting',
  imports: [
    MatCheckbox,
    MatExpansionPanelHeader,
    MatAccordion, MatExpansionPanel, MatExpansionPanelTitle, FormsModule, ReactiveFormsModule, DatePipe, NgIf
  ],
  templateUrl: './meeting.component.html'
})
export class MeetingComponent implements OnInit {
  currentDateTime: string;
  currentDateTimeDisplay: string;

  staffs: StaffBase[] = [];
  meetings: Meeting[] = [];
  listFiltered: StaffBase[] = this.staffs;

  showToast = false;
  toastMessage = '';

  meetingDetails = new FormGroup({
    meetingName: new FormControl(''),
    meetingDescription: new FormControl(''),
    empIdList: new FormControl(['']),
    meetingDateTime: new FormControl(''),
    meetingLink: new FormControl(''),
  });

  constructor(private meetingService: MeetingService, private staffService: StaffService, private datePipe: DatePipe) {
    this.currentDateTime = this.getCurrentDateTime();
    this.currentDateTimeDisplay = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss') || '';
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    this.loadMeetings();
    this.loadStaffs();
  }

  loadMeetings(): void {
    let meetingFetch = this.meetingService.getAllMeeting();
    if (meetingFetch != null) {
      meetingFetch.subscribe(res => {
        this.meetings = res;
        console.log(res);
      });
    }
  }

  loadStaffs(): void {
    this.staffService.getAllStaffBasic()
      .subscribe(res => {
        this.staffs = res;
        this.listFiltered = this.staffs;
      });
  }

  createMeeting() {
    console.log(this.meetingDetails.controls.empIdList.value);
    let meetingName = this.meetingDetails.controls.meetingName.value;
    let meetingDescription = this.meetingDetails.controls.meetingDescription.value;
    let meetingDateTime = this.meetingDetails.controls.meetingDateTime.value;
    let meetingLink = this.meetingDetails.controls.meetingLink.value;
    let meetingOwner = localStorage.getItem('username');
    let meetingStaffs = this.meetingDetails.controls.empIdList.value;
    if (meetingName != null && meetingDescription != null && meetingDateTime != null &&
      meetingLink != null && meetingOwner != null && meetingStaffs != null &&
      meetingName != '' && meetingDescription != '' && meetingDateTime != '' &&
      meetingLink != '' && meetingOwner != '') {
      let formattedDate = formatDate(meetingDateTime, "dd-MM-yyyy HH:mm a", "en-US");
      meetingStaffs = meetingStaffs.filter(s => s != '');
      if (meetingStaffs.length == 0) {
        this.showToastMessage("Please select staffs");
      } else {
        this.meetingService.createMeeting(
          new MeetingDto(
            meetingName,
            meetingDescription,
            meetingStaffs,
            formattedDate,
            meetingLink,
            meetingOwner
          )
        ).subscribe(res => {
          console.log(res);
          this.showToastMessage("Meeting scheduled successfully!");
          // Reset the form and listFiltered
          this.meetingDetails.reset();
          this.listFiltered = this.staffs; // Reset the filtered staff list
          this.meetingDetails.controls.empIdList.setValue([]);
          this.loadMeetings();
        });
      }
    } else {
      this.showToastMessage("Fill all details");
    }
  }

  filterList(event: any): void {
    let query = event.target.value;
    this.listFiltered = this.staffs.filter(st =>
      st.staffName.toLowerCase().includes(query.toLowerCase())
    );
  }

  checkChange(event: any): void {
    let valueId = event.target.value;
    if (event.target.checked) {
      this.meetingDetails.controls.empIdList.value?.push(valueId);
    } else {
      let list = this.meetingDetails.controls.empIdList.value;
      if (list != null) {
        this.meetingDetails.controls.empIdList.setValue(list.filter(v => v != valueId));
      }
    }
  }

  joinMeet(meetingLink: string): void {
    if (meetingLink) {
      console.log(meetingLink);
      window.open(meetingLink, '_blank');
    } else {
      alert('Meeting link is not available');
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
