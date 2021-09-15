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
  total_items: any;
  total_price: any;
  cart_products: any = [];
  constructor(private productService: ProductsService) {
    this.get_cart_items();
  }

  get_cart_items() {

    this.cart_products = [];
    this.cart = localStorage.getItem('cart');
    if (this.cart) {
      this.total_price = 0;
      this.cart = JSON.parse(this.cart);
      this.total_items = this.cart.length;
      for (let i = 0; i < this.cart.length; i++) {
        this.productService.getProductByProductID(this.cart[i].product_id, this.cart[i].product_turnaround)
          .subscribe(
            response => {
              this.result = response;
              if (this.result.success) {
                this.result.data[0].product_turnaround = this.cart[i].product_turnaround;
                this.result.data[0].total_price = Number(this.result.data[0].price) + (Number(this.result.data[0].price) * (Number(this.result.data[0].vat) / 100));
                this.cart_products.push(this.result.data[0]);
                this.total_price += Math.fround(this.result.data[0].total_price);
                this.total_price = Math.round(this.total_price);
              } else {
                this.cart_products = [{ id: 0, name: 'No Record Found' }];
              }
            }
          )
      }
    }

  }

  delete_product(index: any) {
    this.cart = localStorage.getItem('cart');
    this.cart = JSON.parse(this.cart);
    this.cart.splice(index, 1);

    localStorage.removeItem('cart');
    const temp = localStorage.setItem("cart", JSON.stringify(this.cart));
    this.productService.setCartQty(this.cart.length);
    this.get_cart_items();
  }
}