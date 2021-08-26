import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../common/services/products.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent {
  cart: any;
  result: any;
  cart_products: any = [];
  constructor(private productService: ProductsService) {
    this.cart = localStorage.getItem('cart');
    this.cart = JSON.parse(this.cart);
    for (let i = 0; i < this.cart.length; i++) {
      this.productService.getProductByProductID(this.cart[i].product_id, this.cart[i].product_turnaround)
        .subscribe(
          response => {
            this.result = response;
            if (this.result.success) {
              this.cart_products.push(this.result.data[0]);
            } else {
              this.cart_products = [{ id: 0, name: 'No Record Found' }];
            }
          }
        )
    }
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

  }



}
