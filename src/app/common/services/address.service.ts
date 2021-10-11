import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private addressUrl = `${environment.api_base_url}api/address`;
  constructor(private http: HttpClient) { }

  getAddress(id: any) {
    return this.http.get(this.addressUrl + '/' + id);
  }

  addAddress(address: any) {
    return this.http.post(this.addressUrl, address);
  }

  deleteAddress(id: any) {
    return this.http.delete(this.addressUrl + '/' + id);
  }

  setDefaultBillingAddress(id: any, user_id: any) {
    var data = {
      "user_id": user_id
    };
    return this.http.put(this.addressUrl + '/set_default_billing_address/' + id, data);
  }

  setDefaultDeliveryAddress(id: any, user_id: any) {
    var data = {
      "user_id": user_id
    };
    return this.http.put(this.addressUrl + '/set_default_delivery_address/' + id, data);
  }

  getDefaultDeliveryAddress(id: any) {
    return this.http.get(this.addressUrl + '/get_default_delivery_address/' + id);
  }

  getDefaultBillingAddress(id: any) {

    return this.http.get(this.addressUrl + '/get_default_billing_address/' + id);
  }
}
