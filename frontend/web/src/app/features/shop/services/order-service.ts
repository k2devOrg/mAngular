import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrderRequest } from '../models/create-order-request';
import { OrderResponse } from '../models/order-response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/orders';

  createOrder(request: CreateOrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(this.apiUrl, request);
  }

  getMyOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`${this.apiUrl}/my`);
  }
}
