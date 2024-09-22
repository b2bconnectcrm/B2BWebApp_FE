import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConstants } from '../constants/appConstants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dataSource = new BehaviorSubject<any>(null);
  private loginDataSource = new BehaviorSubject<any>(null);
  
  currentUser = this.loginDataSource.asObservable();
  currentData = this.dataSource.asObservable();

  updateData(data: any) {
    this.dataSource.next(data);
  }
  
  updateLoginUser(data: any) {
    this.loginDataSource.next(data);
  }



  constructor(private _http: HttpClient) { }


  doLogin(userAccount: any): Observable<any>{
    return this._http.post<any>(AppConstants.POST_DO_LOGIN(), userAccount);
  }
  checkOtp(otp:any){
    return this._http.post<any>(AppConstants.DO_CHECK_OTP(), otp);
  }
}
