import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../common/services/products.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit {

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
