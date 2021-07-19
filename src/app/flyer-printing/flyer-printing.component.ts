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
  finishing_size: any;
  printed_pages: any;
  constructor(private productService: ProductsService, private snackBar: MatSnackBar, private router: ActivatedRoute) { }

  ngOnInit() {
    this.productService.getProductSubject.subscribe(() => {
      this.id = this.router.snapshot.params.id;
      this.fetchProduct();
    })

  }

  product_form = new FormGroup({
    name: new FormControl(''),
    // price: new FormControl(''),
    subcategory_id: new FormControl(''),
    category_id: new FormControl(''),
    // finishingoptions_id: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
  });

  submitProduct() {

  }

  change_finishing_size(f_size: any) {
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
            this.finishing_size = this.result.data;

          }
        },
        error => {
          console.log(error)
        }
      )
  }
}
