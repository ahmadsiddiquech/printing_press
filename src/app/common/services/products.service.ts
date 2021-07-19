import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl = `http://localhost:3000/api/products`;
  constructor(private http: HttpClient) { }
  public getProductSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  getProducts(): Observable<any> {
    return this.http.get(this.productsUrl);
  }

  getProduct(id: any) {
    return this.http.get(this.productsUrl + '/' + id);
  }

  getProductFinishingSize(id: any) {
    return this.http.get(this.productsUrl + '/product_finishing_size/' + id);
  }

  getProductPrintedPages(f_size: any, id: any) {
    return this.http.get(this.productsUrl + '/product_printed_pages/' + id);
  }

  addProduct(product: any) {
    return this.http.post(this.productsUrl, product);
  }

  deleteProduct(id: any) {
    return this.http.delete(this.productsUrl + '/' + id);
  }

  updateProducts(id: any, product: any) {
    return this.http.put(this.productsUrl + '/' + id, product);
  }

  updateProductsImage(id: any, product: any) {
    return this.http.put(this.productsUrl + '/upload_image/' + id, product);
  }
}
