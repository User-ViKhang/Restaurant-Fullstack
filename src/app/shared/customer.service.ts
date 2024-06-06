import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponeModel } from '../models/ResponeModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiURL: string
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL
  }

  getCustomerList(): Observable<ResponeModel> {
    return this.http.get<ResponeModel>(this.apiURL + "/Customer");
  }

}
