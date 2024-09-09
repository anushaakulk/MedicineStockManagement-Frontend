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
    return this.http.get<medicine>(this.baseUrl + 'api/MedicinesLists/'+id);
  }

  CreateMedicineList(_data: medicine) {
    return this.http.post(this.baseUrl + 'api/MedicinesLists/', _data, { responseType: 'text' });
  }

  UpdateMedicineList(_data: medicine) {
    return this.http.put(this.baseUrl + 'api/MedicinesLists/' + _data.mname, _data, { responseType: 'text' });
  }

  DeleteMedicineList(id: number) {
    return this.http.delete(this.baseUrl + 'api/MedicinesLists/' + id, { responseType: 'text' });
  }
}
