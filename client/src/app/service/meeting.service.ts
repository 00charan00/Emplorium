import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResponseBase} from '../model/response-base';
import {MeetingDto} from '../model/meetingDto';
import {Meeting} from '../model/meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  BASE_URL = "http://localhost:8080/meet/"

  constructor(private http:HttpClient) { }

  createMeeting(meeting:MeetingDto){
    let url = `${this.BASE_URL}create`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password')
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Accept','application/json');
    return this.http.post<ResponseBase>(url,meeting,{headers:headerVals})
  }

  getAllMeeting(){
    let url = `${this.BASE_URL}mine`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password')
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Accept','application/json');
    let id = localStorage.getItem('id');
    let mail = localStorage.getItem('username')
    if(id != null && mail != null) {
      return this.http.get<Meeting[]>(url, {headers: headerVals, params: {staffId: id,staffMail:mail}});
    }else{
      console.log("unable to fetch");
      return null;
    }
  }
}
