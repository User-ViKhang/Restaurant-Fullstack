import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderItem } from './order-item.model';
import { CreateOrderRequest, Order } from './order.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponeModel } from '../models/ResponeModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData!: Order;
  orderItems: OrderItem[] = []
  constructor(private http: HttpClient) { }
  createOrderItem(data: CreateOrderRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.apiURL + "/Order", data, { headers: headers });
  }
}
