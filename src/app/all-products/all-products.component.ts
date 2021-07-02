import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../common/services/products.service';

@Component({
  selector: 'all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {

  products: any;
  result: any;
  data: any;

  constructor(private productService: ProductsService) { }

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
