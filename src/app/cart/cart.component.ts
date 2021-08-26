import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../common/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
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

  delete_product(id: any) {
    this.cart = localStorage.getItem('cart');
    console.log(id)
  }
}