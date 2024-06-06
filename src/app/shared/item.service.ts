import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { ResponeModel } from '../models/ResponeModel';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  apiURL: string
  constructor(private _http: HttpClient) {
    this.apiURL = environment.apiURL
  }
  getItemList(): Observable<ResponeModel> {
    return this._http.get<ResponeModel>(this.apiURL + "/Item");
  }
}
