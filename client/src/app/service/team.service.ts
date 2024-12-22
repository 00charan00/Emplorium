import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Team} from '../model/team';
import {ResponseBase} from '../model/response-base';
import {TeamDto} from '../model/team-dto';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  API_BASE_URL = "http://localhost:8080/team/";

  constructor(private http:HttpClient) { }

  getAllTeams(){
    let url = `${this.API_BASE_URL}all`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password')
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Accept','application/json');
    return this.http.get<Team[]>(url,{headers:headerVals});
  }

  getMyTeams(){
    let url = `${this.API_BASE_URL}mine`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password')
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Accept','application/json');
    if(username != null)
    return this.http.get<Team[]>(url, {headers: headerVals, params: {staffEmail:username}});
    return null;
  }

  createTeam(team:TeamDto){
    let url = `${this.API_BASE_URL}create`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password')
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Accept','application/json');
    return this.http.post<ResponseBase>(url,team,{headers:headerVals});

  }

  deleteTeam(teamId:string){
    let url = `${this.API_BASE_URL}delete/${teamId}`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password')
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Accept','application/json');
    return this.http.delete<ResponseBase>(url);
  }

}
