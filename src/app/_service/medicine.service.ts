import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { medicine } from '../_model/medicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  Getall() {
    return this.http.get<medicine[]>(this.baseUrl + 'api/MedicinesLists');
  }

  Getbycode(id:number) {
    return this.http.get<medicine>(this.baseUrl + 'Customer/Getbycode?code='+id);
  }

  Createcustomer(_data: medicine) {
    return this.http.post(this.baseUrl + 'Customer/create', _data);
  }

  Updatecustomer(_data: medicine) {
    return this.http.put(this.baseUrl + 'Customer/Update?code=' + _data.mname, _data);
  }

  Deletecustomer(code: string) {
    return this.http.delete(this.baseUrl + 'Customer/Remove?code=' + code);
  }
}
