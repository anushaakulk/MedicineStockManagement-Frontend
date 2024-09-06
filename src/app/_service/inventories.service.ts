import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { inventories } from '../_model/inventories.model';

@Injectable({
  providedIn: 'root'
})
export class InventoriesService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  Getall() {
    return this.http.get<inventories[]>(this.baseUrl + 'api/Inventories');
  }

  Getbycode(id:number) {
    return this.http.get<inventories>(this.baseUrl + 'Customer/Getbycode?code='+id);
  }

  Createcustomer(_data: inventories) {
    return this.http.post(this.baseUrl + 'Customer/create', _data);
  }

  Updatecustomer(_data: inventories) {
    return this.http.put(this.baseUrl + 'Customer/Update?code=' + _data.id, _data);
  }

  Deletecustomer(code: string) {
    return this.http.delete(this.baseUrl + 'Customer/Remove?code=' + code);
  }
}
