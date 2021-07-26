import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../common/services/products.service';
import { ActivatedRoute } from '@angular/router';
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
  prices: any;
  constructor(private productService: ProductsService, private snackBar: MatSnackBar, private router: ActivatedRoute) { }

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
    lamination: new FormControl(''),
  });

  submitProduct() {

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
          console.log(this.result);
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
    this.productService.getProductprices(p_lamination, p_cover, p_stock, p_page, f_size, this.id)
      .subscribe(
        response => {
          this.result = response;
          if (this.result.success) {
            this.prices = this.result.data;
          } else {
            this.prices = [{ id: 0, name: 'No Record Found' }];
          }
        }
      )
  }


}
