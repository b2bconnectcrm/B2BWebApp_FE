
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../constants/appConstants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

  createEmployee(employee: any){
    return this._http.post<any>(AppConstants.POST_CREAE_EMPLOYEE(), employee);
  }

  getAllEmployees(){
    return this._http.get<any>(AppConstants.GET_ALL_EMPLOYEES());
  }

  getEmployee(id:any){
    return this._http.get<any>(AppConstants.GET_EMPLOYESS_BY_ID(id));
  }

  updateEmployee(employee: any){
    return this._http.put<any>(AppConstants.PUT_UPDATE_EMPLOYESS(employee?.id), employee);
  }
  
  deleteEmployee(id:any){
    return this._http.delete<any>(AppConstants.DELETE_EMPLOYESS_BY_ID(id));
  }



}