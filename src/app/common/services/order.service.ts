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
  addOrderDesigns(id: any, design: any, data: any) {
    return this.http.put(this.orderUrl + '/upload_designs/' + id + '/?product_id=' + data.product_id + '&product_turnaround=' + data.product_turnaround, design,);
  }

  deleteOrder(id: any) {
    return this.http.delete(this.orderUrl + '/' + id);
  }
}
