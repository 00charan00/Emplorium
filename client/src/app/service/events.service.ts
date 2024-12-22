import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Events} from '../model/event';
import {ResponseBase} from '../model/response-base';
import {EventDto} from '../model/event-dto';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  API_BASE_URL = 'http://localhost:8080/event/'

  constructor(private http:HttpClient) {}

  getEvents(){
    let url = `${this.API_BASE_URL}getEvent`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password')
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Accept','application/json');
    return this.http.get<Events[]>(url,{headers:headerVals});
  }

  postEvent(event:EventDto){
    let url = `${this.API_BASE_URL}addEvent`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password')
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Content-Type','application/json');
    return this.http.post<ResponseBase>(url,event,{headers:headerVals});
  }

  cancelEvent(eventId: String) {
    let url = `${this.API_BASE_URL}cancel/${eventId}`;
    let username = localStorage.getItem('username');
    let pass = localStorage.getItem('password');
    const headerVals = new HttpHeaders()
      .set('Authorization','Basic ' + btoa(username+':'+pass))
      .set('Content-Type','application/json');
    return this.http.put<ResponseBase>(url,null,{headers: headerVals});
  }
}
