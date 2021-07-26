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

  getProductFinishingSize(id: any) {
    return this.http.get(this.productsUrl + '/product_finishing_size/' + id);
  }

  getProductPrintedPages(f_size: any, id: any) {
    var data = {
      "id": id,
      "f_size": f_size
    };
    return this.http.post(this.productsUrl + '/product_printed_pages/', data);
  }

  getProductStocks(p_page: any, f_size: any, id: any) {
    var data = {
      "id": id,
      "p_page": p_page,
      "f_size": f_size
    };
    return this.http.post(this.productsUrl + '/product_stocks/', data);
  }

  getProductCovers(p_stock: any, p_page: any, f_size: any, id: any) {
    var data = {
      "id": id,
      "p_stock": p_stock,
      "p_page": p_page,
      "f_size": f_size
    };
    return this.http.post(this.productsUrl + '/product_covers/', data);
  }

  getProductLaminations(p_cover: any, p_stock: any, p_page: any, f_size: any, id: any) {
    var data = {
      "id": id,
      "p_cover": p_cover,
      "p_stock": p_stock,
      "p_page": p_page,
      "f_size": f_size
    };
    return this.http.post(this.productsUrl + '/product_laminations/', data);
  }

  getProductprices(p_lamination: any, p_cover: any, p_stock: any, p_page: any, f_size: any, id: any) {
    var data = {
      "id": id,
      "p_lamination": p_lamination,
      "p_cover": p_cover,
      "p_stock": p_stock,
      "p_page": p_page,
      "f_size": f_size
    };
    return this.http.post(this.productsUrl + '/product_prices/', data);
  }
}
