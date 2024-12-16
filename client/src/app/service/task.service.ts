import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StaffTask} from '../model/staff-task';
import {ResponseBase} from '../model/response-base';
import {AuthService} from './auth.service';
import {Meeting} from '../model/meeting';
import {TaskDto} from '../model/task-dto';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  API_BASE_URL= "http://localhost:8080/task/";

  constructor(private http:HttpClient,private authService:AuthService) { }


  getAllTask(){
    let url = `${this.API_BASE_URL}mine`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password');
    let id = localStorage.getItem('id');
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Accept','application/json');
    if(this.authService.isAdministrator()){
      return this.http.get<StaffTask[]>(url,{headers:headerVals});
    }
    if(id != null) {
      return this.http.get<StaffTask[]>(url, {headers: headerVals, params: {staffId: id}});
    }
    return null;
  }

  createTask(task:TaskDto){
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

  updateModuleLevelProgress(taskId:string, moduleName:string, progressStatus:string, referencePics:FileList, comment:string){
    let url = `${this.API_BASE_URL}module/progress`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password')
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Accept','application/json');
    let pics = new FormData();
    for(let i=0;i<referencePics.length;i++){
      pics.append('refs',referencePics[i]);
    }
    return this.http.put<ResponseBase>(url,pics,{headers:headerVals,params:{
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

  getTaskById(taskId:string){
    let url = `${this.API_BASE_URL}get/${taskId}`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password')
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Accept','application/json');
    return this.http.get<StaffTask>(url,{headers:headerVals});
  }

  approveTask(taskId:string){
    let url = `${this.API_BASE_URL}approve`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password')
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Accept','application/json');
    return this.http.put<ResponseBase>(url,null,{headers:headerVals,params:{taskId:taskId}});
  }
}
