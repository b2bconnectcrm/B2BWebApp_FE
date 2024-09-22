import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../constants/appConstants';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http: HttpClient) { }

  getAllRoles(): Observable<Role>{
    return this._http.get<any>(AppConstants.GET_ALL_ROLES());
  }

  getAllRolesByDepartment(department: string): Observable<Role>{
    return this._http.get<any>(AppConstants.GET_ALL_ROLES_BY_DEPARTMENT(department));
  }

  createRole(role: any){
    return this._http.post<any>(AppConstants.POST_CREAE_ROLE(), role);
  }

  getRole(id:any){
    return this._http.get<any>(AppConstants.GET_ROLE_BY_ID(id));
  }

  updateRole(role: any){
    return this._http.put<any>(AppConstants.PUT_UPDATE_ROLE(role?.id), role);
  }

  
  deleteRole(id:any){
    return this._http.delete<any>(AppConstants.DELETE_ROLE_BY_ID(id));
  }

}
