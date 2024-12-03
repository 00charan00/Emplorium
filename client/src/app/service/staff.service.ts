import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RegisterReq} from '../model/register-req';
import {ResponseBase} from '../model/response-base';
import {LoginRegisterResponse} from '../model/login-register-response';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  API_BASE_URL = 'http://localhost:8080/staff/'

  constructor(private http:HttpClient) {}

  registerStaff(registerReq:RegisterReq){
      return this.http.post<LoginRegisterResponse>(this.API_BASE_URL+'add',registerReq);
  }

  updateStaff(staffId:string, staffDetails:RegisterReq){
    return this.http.put<ResponseBase>(this.API_BASE_URL+ `update/${staffId}`,staffDetails);
  }

  deleteStaff(staffId:string){
    let params:HttpParams = new HttpParams();
    params.set('staffId',staffId);
    return this.http.delete<ResponseBase>(this.API_BASE_URL+'del',{params:params});
  }

  loginStaff(loginReq:RegisterReq){
    return this.http.post<LoginRegisterResponse>(this.API_BASE_URL+'login',loginReq);
  }



}
