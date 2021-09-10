import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../common/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-flyer-printing',
  templateUrl: './flyer-printing.component.html',
  styleUrls: ['./flyer-printing.component.css'],
  providers: [MatSnackBar]
})


export class FlyerPrintingComponent {
  id: any;
  result: any;
  product: any;
  printed_pages: any;
  finishing_sizes: any;
  stocks: any;
  covers: any;
  laminations: any;
  quantities: any;
  prices: any;
  price_table: any
  vats: any;
  totals: any;
  product_id: any;
  turnaround: any;
  quantity: any;

  // cart = new Array();
  // cart: Array<any> = [];
  constructor(private productService: ProductsService, private snackBar: MatSnackBar, private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.productService.getProductSubject.subscribe(() => {
      this.id = this.router.snapshot.params.id;
      this.fetchProduct();
    })

  }

  product_form = new FormGroup({
    finishing_size: new FormControl(''),
    printed_page: new FormControl(''),
    stock: new FormControl(''),
    cover: new FormControl(''),
    lamination: new FormControl('')
  });

  submitProduct(product_id: any, product_turnaround: any) {
    // var cart = { "product_id": product_id, "product_turnaround": product_turnaround };\
    // localStorage.removeItem('cart');
    var cart = [];
    var existing_cart = JSON.parse(localStorage.getItem("cart") || '{}');

    if (existing_cart.length > 0) {
      cart.push(...existing_cart);
    }
    // console.log(cart);
    var new_cart = { "product_id": product_id, "product_turnaround": product_turnaround };
    cart.push(new_cart);
    // console.log(cart);

    localStorage.setItem("cart", JSON.stringify(cart));
    this.productService.setCartQty(cart.length);
    this.route.navigateByUrl('/cart');
  }

  fetchProduct() {
    this.productService.getProduct(this.id)
      .subscribe(
        response => {
          this.result = response;
          if (this.result.success) {
            this.product = this.result.data;
          }
        },
        error => {
          console.log(error)
        }
      )
    this.productService.getProductFinishingSize(this.id)
      .subscribe(
        response => {
          this.result = response;
          if (this.result.success) {
            this.finishing_sizes = this.result.data;
          }
        },
        error => {
          console.log(error)
        }
      )
  }

  change_finishing_size(f_size: any) {
    this.product_form.controls['printed_page'].reset();
    this.product_form.controls['stock'].reset();
    this.product_form.controls['cover'].reset();
    this.product_form.controls['lamination'].reset();
    this.prices = '';
    this.price_table = '';
    this.vats = '';
    this.totals = '';
    this.product_id = '';
    this.turnaround = '';
    this.quantity = '';
    this.productService.getProductPrintedPages(f_size, this.id)
      .subscribe(
        response => {
          this.result = response;
          if (this.result.success) {
            this.printed_pages = this.result.data;

          } else {
            this.printed_pages = [{ id: 0, name: 'No Record Found' }];
          }
        }
      )
  }

  change_printed_page(p_page: any, f_size: any) {
    this.product_form.controls['stock'].reset();
    this.product_form.controls['cover'].reset();
    this.product_form.controls['lamination'].reset();
    this.prices = '';
    this.price_table = '';
    this.vats = '';
    this.totals = '';
    this.product_id = '';
    this.turnaround = '';
    this.quantity = '';
    this.productService.getProductStocks(p_page, f_size, this.id)
      .subscribe(
        response => {
          this.result = response;
          if (this.result.success) {
            this.stocks = this.result.data;
          } else {
            this.stocks = [{ id: 0, name: 'No Record Found' }];
          }
        }
      )
  }

  change_stock(p_stock: any, p_page: any, f_size: any) {
    this.product_form.controls['cover'].reset();
    this.product_form.controls['lamination'].reset();
    this.prices = '';
    this.price_table = '';
    this.vats = '';
    this.totals = '';
    this.product_id = '';
    this.turnaround = '';
    this.quantity = '';
    this.productService.getProductCovers(p_stock, p_page, f_size, this.id)
      .subscribe(
        response => {
          this.result = response;
          if (this.result.success) {
            this.covers = this.result.data;
          } else {
            this.covers = [{ id: 0, name: 'No Record Found' }];
          }
        }
      )
  }

  change_cover(p_cover: any, p_stock: any, p_page: any, f_size: any) {
    this.product_form.controls['lamination'].reset();
    this.prices = '';
    this.price_table = '';
    this.vats = '';
    this.totals = '';
    this.product_id = '';
    this.turnaround = '';
    this.quantity = '';
    this.productService.getProductLaminations(p_cover, p_stock, p_page, f_size, this.id)
      .subscribe(
        response => {
          this.result = response;
          if (this.result.success) {
            this.laminations = this.result.data;
          } else {
            this.laminations = [{ id: 0, name: 'No Record Found' }];
          }
        }
      )
  }

  change_lamination(p_lamination: any, p_cover: any, p_stock: any, p_page: any, f_size: any) {
    this.prices = '';
    this.price_table = '';
    this.vats = '';
    this.totals = '';
    this.product_id = '';
    this.turnaround = '';
    this.quantity = '';
    this.productService.getProductCompletePrices(p_lamination, p_cover, p_stock, p_page, f_size, this.id)
      .subscribe(
        response => {
          this.result = response;
          if (this.result.success) {
            this.price_table = this.result.data;
          } else {
            this.price_table = [{ id: 0, name: 'No Record Found' }];
          }
        }
      )
  }
  selected: any;
  calculate_price(product_id: any, price: any, turnaround: any, vat: any, qty: any) {
    this.product_id = product_id;
    this.turnaround = turnaround;
    this.quantity = qty;
    this.prices = Number(price);
    this.vats = Number(vat);

    if (this.vats > 0) {
      this.totals = this.prices + (this.prices * (this.vats / 100));
    } else {
      this.totals = this.prices;
    }

  }

  // change_turnaround(p_turnaround: any, p_lamination: any, p_cover: any, p_stock: any, p_page: any, f_size: any) {
  //   this.product_form.controls['quantity'].reset();
  //   this.prices = '';
  //   this.vats = '';
  //   this.totals = '';
  //   this.product_id = '';
  //   this.productService.getProductquantities(p_turnaround, p_lamination, p_cover, p_stock, p_page, f_size, this.id)
  //     .subscribe(
  //       response => {
  //         this.result = response;
  //         console.log(this.result)
  //         if (this.result.success) {
  //           this.quantities = this.result.data;
  //         } else {
  //           this.quantities = [{ id: 0, name: 'No Record Found' }];
  //         }
  //       }
  //     )
  // }


  // change_quantity(p_quantity: any, p_turnaround: any, p_lamination: any, p_cover: any, p_stock: any, p_page: any, f_size: any) {
  //   this.prices = '';
  //   this.vats = '';
  //   this.totals = '';
  //   this.product_id = '';
  //   this.productService.getProductprices(p_quantity, p_turnaround, p_lamination, p_cover, p_stock, p_page, f_size, this.id)
  //     .subscribe(
  //       response => {
  //         this.result = response;
  //         if (this.result.success) {
  //           this.result = this.result.data[0];
  //           this.product_id = this.result.product_id;
  //           this.prices = Number(this.result.price);
  //           this.vats = Number(this.result.vat);

  //           if (this.vats > 0) {
  //             this.totals = this.prices + (this.prices * (this.vats / 100));
  //           } else {
  //             this.totals = this.prices;
  //           }

  //         } else {
  //           this.totals = [{ id: 0, name: 'No Record Found' }];
  //         }
  //       }
  //     )
  // }


}
