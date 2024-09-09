import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { OrderDetails } from '../_model/orderDetails.model';


@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  Getall() {
    return this.http.get<OrderDetails[]>(this.baseUrl + 'api/OrderDetails');
  }

  Getbycode(id:number) {
    return this.http.get<OrderDetails>(this.baseUrl + 'api/OrderDetails/'+id);
  }

  CreateOrderDetails(_data: OrderDetails) {
    return this.http.post(this.baseUrl + 'api/OrderDetails/', _data, { responseType: 'text' });
  }

  UpdateOrderDetails(_data: OrderDetails) {
    return this.http.put(this.baseUrl + 'api/OrderDetails/' + _data.orderId, _data, { responseType: 'text' });
  }

  DeleteOrderDetails(code: number) {
    return this.http.delete(this.baseUrl + 'api/OrderDetails/' + code, { responseType: 'text' });
  }
}
