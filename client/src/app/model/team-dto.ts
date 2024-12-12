export class TeamDto {
  teamName:string;
  teamMembers:string[];
  teamLeader:string;


  constructor(teamName: string, teamMembers: string[], teamLeader: string) {
    this.teamName = teamName;
    this.teamMembers = teamMembers;
    this.teamLeader = teamLeader;
  }

  get getTeamName(){return this.teamName;}
  get getTeamLeader(){return this.teamLeader;}
  get getTeamMembers(){return this.teamMembers;}
}
