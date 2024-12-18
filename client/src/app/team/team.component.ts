import {Component, OnInit} from '@angular/core';
import {Team} from '../model/team';
import {TeamService} from '../service/team.service';
import {AuthService} from '../service/auth.service';

import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatCheckbox} from '@angular/material/checkbox';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {StaffBase} from '../model/staff-base';
import {StaffService} from '../service/staff.service';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {TeamDto} from '../model/team-dto';

@Component({
  selector: 'app-team',
  imports: [
    MatAccordion,
    MatCheckbox,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    ReactiveFormsModule,
    MatRadioButton,
    MatRadioGroup
  ],
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit{

  teams:Team[]=[];
  teamDetails = new FormGroup({
    teamName: new FormControl(''),
    teamMembers: new FormControl(['']),
    teamLeader: new FormControl('')
  });
  staffs: StaffBase[] = [];
  listFiltered: StaffBase[] = this.staffs;

  constructor(private teamService:TeamService,private authService:AuthService, private staffService:StaffService) {
  }

  ngOnInit(): void {
    if(this.authService.isAdministrator()) {
      this.teamService.getAllTeams()
        .subscribe(res => {
          this.teams = res;
        })
    }else if(this.authService.isAuthenticated()){
      this.teamService.getMyTeams()
        .subscribe(res => {
          this.teams = res;
        })
    }
    this.staffService.getAllStaffBasic()
      .subscribe(res => {
        this.staffs = res;
        this.listFiltered = this.staffs;
      })
  }

  filterList(event:any) {
    let query = event.target.value;
    this.listFiltered = this.staffs.filter(st =>
      st.staffName.toLowerCase().includes(query.toLowerCase())
    );
  }

  checkChange(event:any) {
    let valueId = event.target.value;
    if(event.target.checked){
      this.teamDetails.controls.teamMembers.value?.push(valueId);
    }else{
      let list= this.teamDetails.controls.teamMembers.value;
      if(list != null){
        this.teamDetails.controls.teamMembers.setValue(list.filter(v => v!=valueId))
      }

    }
  }

  createTeam() {
    // console.log(this.teamDetails.controls.teamLeader.value);
    let teamName = this.teamDetails.controls.teamName.value;
    let teamLeaderId = this.teamDetails.controls.teamLeader.value;
    let teamMembersIds = this.teamDetails.controls.teamMembers.value;
    if (teamName != null && teamLeaderId != null && teamMembersIds != null &&
      teamName != '' && teamLeaderId != '') {
      teamMembersIds = teamMembersIds.filter(s => s!='');
      if(teamMembersIds.length == 0){
        console.log("Please Select Staffs")
      }else {
        this.teamService.createTeam(
          new TeamDto(
            teamName,
            teamMembersIds,
            teamLeaderId
          )
        ).subscribe(res => {
          console.log(res);

        })
      }
    }else{
      console.log("Fill all details")
    }
  }
}
