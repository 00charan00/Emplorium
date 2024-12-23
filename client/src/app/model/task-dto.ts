export class TaskDto {
  taskTittle:string;
  taskDescription:string;
  modules:string[];
  teamMembers:string[];
  teamLeader:string;
  teamName:string;
  deadline:string

  constructor(taskTittle: string, taskDescription: string, modules: string[], teamMembers: string[], teamLeader: string, teamName: string, deadline:string) {
    this.taskTittle = taskTittle;
    this.taskDescription = taskDescription;
    this.modules = modules;
    this.teamMembers = teamMembers;
    this.teamLeader = teamLeader;
    this.teamName = teamName;
    this.deadline = deadline;
  }

  get getTaskTittle(){return this.taskTittle;}
  get getTaskDescription(){return this.taskDescription;}
  get getTaskModules(){return this.modules;}
  get getTaskTeamMembers(){return this.teamMembers;}
  get getTaskTeamLeader(){return this.teamLeader;}
  get getTaskTeamName(){return this.teamName;}
  get getTaskDeadline(){return this.deadline;}
}
