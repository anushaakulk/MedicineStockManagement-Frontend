import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { category } from '../_model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  Getall() {
    return this.http.get<category[]>(this.baseUrl + 'api/Categories');
  }

  Getbycode(id:number) {
    return this.http.get<category>(this.baseUrl + 'api/Categories/'+id);
  }

  Createcategory(_data: category) {
    return this.http.post(this.baseUrl + 'api/Categories', _data, { responseType: 'text' });
  }

  Updatecategory(_data: category) {
    return this.http.put(this.baseUrl + 'api/Categories/' + _data.id, _data, { responseType: 'text' });
  }

  Deletecategory(code: number) {
    return this.http.delete(this.baseUrl + 'api/Categories/' + code, { responseType: 'text' });
  }
}
