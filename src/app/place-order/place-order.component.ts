import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from '../common/services/address.service';
import { AuthService } from '../common/services/auth.service';
import { ProductsService } from '../common/services/products.service';
import { ServiceService } from '../common/services/service.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent {
  cart: any;
  result: any;
  total_price = 0;
  cart_products: any = [];
  user_id: any;
  loggedIn: any;
  user_data: any;
  addresses: any;
  billing_address: any;
  delivery_address: any;


  constructor(private addressService: AddressService, private productService: ProductsService, private service: ServiceService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.isLoggedIn.subscribe(response => {
      this.loggedIn = response;
    });
    if (this.loggedIn) {
      this.user_id = localStorage.getItem("user_id");
      this.cart = localStorage.getItem('cart');
      this.cart = JSON.parse(this.cart);
      for (let i = 0; i < this.cart.length; i++) {
        this.productService.getProductByProductID(this.cart[i].product_id, this.cart[i].product_turnaround)
          .subscribe(
            response => {
              this.result = response;
              if (this.result.success) {
                this.cart_products.push(this.result.data[0]);
                this.total_price = this.total_price + Number(this.result.data[0].price);
              } else {
                this.cart_products = [{ id: 0, name: 'No Record Found' }];
              }
            }
          )
      }
      this.addressService.getAddress(this.user_id)
        .subscribe(
          response => {
            this.result = response;
            if (this.result.success === true) {
              this.addresses = this.result.data;
            }
          }
        )

      this.addressService.getDefaultBillingAddress(this.user_id)
        .subscribe(
          response => {
            this.result = response;
            if (this.result.success === true) {
              this.billing_address = this.result.data[0].id;
            }
          }
        )

      this.addressService.getDefaultDeliveryAddress(this.user_id)
        .subscribe(
          response => {
            this.result = response;
            if (this.result.success === true) {
              this.delivery_address = this.result.data[0].id;
            }
          }
        )
    } else {
      this.router.navigateByUrl("/login");
    }
  }

  set_delivery_address(id: any) {
    this.delivery_address = id;
  }

  set_billing_address(id: any) {
    this.billing_address = id;
  }

  orderplacement = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    phone: new FormControl('', [
      Validators.required
    ]),
    country: new FormControl('', [
      Validators.required
    ]),
    state: new FormControl('', [
      Validators.required
    ]),
    postcode: new FormControl('', [
      Validators.required
    ]),
    address: new FormControl('', [
      Validators.required
    ])
  });

  submit_order() {
    // console.log(this.orderplacement.value);
  }



}
