import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Inventories } from '../_model/inventories.model';

@Injectable({
  providedIn: 'root'
})
export class InventoriesService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  Getall() {
    return this.http.get<Inventories[]>(this.baseUrl + 'api/Inventories');
  }

  Getbycode(id:number) {
    return this.http.get<Inventories>(this.baseUrl + 'api/Inventories/'+id);
  }

  CreateInventory(_data: Inventories) {
    return this.http.post(this.baseUrl + 'api/Inventories', _data,{ responseType: 'text' });
  }

  UpdateInventory(_data: Inventories) {
    return this.http.put(this.baseUrl + 'api/Inventories/' + _data.id, _data,{ responseType: 'text' });
  }

  DeleteInventory(id: number) {
    return this.http.delete(this.baseUrl + 'api/Inventories/' + id,{ responseType: 'text' });
  }
}
