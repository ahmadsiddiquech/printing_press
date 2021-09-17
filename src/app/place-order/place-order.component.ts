import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddressService } from '../common/services/address.service';
import { AuthService } from '../common/services/auth.service';
import { OrderService } from '../common/services/order.service';
import { ProductsService } from '../common/services/products.service';
import { ServiceService } from '../common/services/service.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
  providers: [MatSnackBar]
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
  selectedFile: any = [];


  constructor(private addressService: AddressService, private productService: ProductsService, private service: ServiceService, private auth: AuthService, private order: OrderService, private router: Router, private snackBar: MatSnackBar) { }

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
                this.result.data[0].product_turnaround = this.cart[i].product_turnaround;
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

  image_submit() {
    const formdata = new FormData();
    formdata.append('image', this.selectedFile, this.selectedFile.name);
    this.service.updateUsersImage(this.user_id, formdata).subscribe(
      response => {
        this.result = response;
        if (this.result.success) {
        } else {
          console.log("error");
        }
      }
    )
  }


  onImageChange(index: any, event: any, product_id: any, product_turnaround: any) {
    if (event.target.files.length > 0) {

      if (event.target.files[0].size <= 5242880) {
        event.target.files[0].product_id = product_id;
        event.target.files[0].product_turnaround = product_turnaround;
        this.selectedFile.splice(index, 1, event.target.files[0]);
      } else {
        this.snackBar.open('Upload File Less than 5 MB', 'Okay', {
          duration: 5 * 1000,
        });
      }
    }
  }

  place_order() {
    const formdata = new FormData();
    formdata.append('image', this.selectedFile);
    var data = {
      "user_id": this.user_id,
      "order_products": this.cart,
      "product_designs": this.selectedFile,
      "billing_address": this.billing_address,
      "delivery_address": this.delivery_address,
      "total_price": this.total_price
    };
    this.order.addOrder(data).subscribe(
      response => {
        this.result = response;
        if (this.result.success) {
          localStorage.removeItem('cart');
          this.productService.setCartQty(0);
          this.router.navigateByUrl("/my-order-history");
        } else {
          this.snackBar.open('Please Try Later', 'Okay', {
            duration: 5 * 1000,
          });
        }
      }
    )
  }



}
