import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../common/services/products.service';

@Component({
  selector: 'app-flyer-printing',
  templateUrl: './flyer-printing.component.html',
  styleUrls: ['./flyer-printing.component.css'],
  providers: [MatSnackBar]
})


export class FlyerPrintingComponent {
  result: any;
  products: any;
  constructor(private productService: ProductsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.productService.getProductSubject.subscribe(() => {
      this.fetchProducts();
    })

  }

  fetchProducts() {
    this.productService.getProducts()
      .subscribe(
        response => {
          this.result = response;
          if (this.result.success) {
            this.products = this.result.data;
          }
        },
        error => {
          console.log(error)
        }
      )
  }

}
