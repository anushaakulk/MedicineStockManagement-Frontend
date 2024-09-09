import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { medicine } from '../_model/medicine.model';
import { sales } from '../_model/sales.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  Getall() {
    return this.http.get<sales[]>(this.baseUrl + 'api/SalesList');
  }

  Getbycode(id:number) {
    return this.http.get<sales>(this.baseUrl + 'api/SalesList'+id);
  }

  CreateSales(_data: sales) {
    return this.http.post(this.baseUrl + 'api/SalesList', _data,{ responseType: 'text' });
  }

  UpdateSales(_data: sales) {
    return this.http.put(this.baseUrl + 'api/SalesList' + _data.id, _data,{ responseType: 'text' });
  }

  DeleteSales(code: string) {
    return this.http.delete(this.baseUrl + 'api/SalesList' + code,{ responseType: 'text' });
  }
}
