import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl = `http://localhost:3000/api/orders`;
  constructor(private http: HttpClient) { }

  getOrder(id: any) {
    return this.http.get(this.orderUrl + '/' + id);
  }

  getOrders(user_id: any) {
    return this.http.get(this.orderUrl + '/' + user_id);
  }

  addOrder(order: any) {
    return this.http.post(this.orderUrl, order);
  }

  deleteOrder(id: any) {
    return this.http.delete(this.orderUrl + '/' + id);
  }
}
