import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../constants/appConstants';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  constructor(private _http: HttpClient) { }

  createDeals(Deals: any){
    return this._http.post<any>(AppConstants.POST_CREAE_DEALS(), Deals);
  }

  getAllDealss(){
    return this._http.get<any>(AppConstants.GET_ALL_DEALS());
  }

  getDeals(id:any){
    return this._http.get<any>(AppConstants.GET_DEALS_BY_ID(id));
  }

  updateDeals(Deals: any){
    return this._http.put<any>(AppConstants.PUT_UPDATE_DEALS(Deals?.id), Deals);
  }
  
  deleteDeals(id:any){
    return this._http.delete<any>(AppConstants.DELETE_DEALS_BY_ID(id));
  }
}
