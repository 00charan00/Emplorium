import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StaffTask} from '../model/staff-task';
import {ResponseBase} from '../model/response-base';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  API_BASE_URL= "http://localhost:8080/task/";

  constructor(private http:HttpClient) { }


  getAllTask(){
    let url = `${this.API_BASE_URL}all`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password')
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Accept','application/json');
    return this.http.get<StaffTask>(url);
  }

  createTask(task:StaffTask){
    let url = `${this.API_BASE_URL}create`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password')
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Accept','application/json');
    return this.http.post<ResponseBase>(url,task,{headers:headerVals});
  }


  assignTeam (teamId:string,taskId:string){
    let url = `${this.API_BASE_URL}assign`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password')
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Accept','application/json');
    return this.http.post<ResponseBase>(url,null,{headers:headerVals,params:{taskId:taskId,teamId:teamId}});
  }

  updateModuleLevelProgress(taskId:string, moduleName:string, progressStatus:string, referencePics:FormData, comment:string){
    let url = `${this.API_BASE_URL}module/progress`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password')
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Accept','application/json');
    return this.http.post<ResponseBase>(url,referencePics,{headers:headerVals,params:{
        taskId:taskId,
        moduleName:moduleName,
        progressStatus:progressStatus,
        comment:comment
      }});
  }

  updateTaskProgress(taskId:string,taskProgressStatus:string){
    let url = `${this.API_BASE_URL}/progress`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password')
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Accept','application/json');
    return this.http.post<ResponseBase>(url,null,{headers:headerVals,params:{
        taskId:taskId,
        progressStatus:taskProgressStatus,
      }});
  }


}
