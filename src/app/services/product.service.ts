import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/product-info.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http
      .get<any>('assets/data/products.json')
      .pipe(map((result) => <IProduct[]>result.data));
  }

  getCategories(): Observable<string[]> {
    return this.http
      .get<any>('assets/data/categories.json')
      .pipe(map((result) => <string[]>result.data));
  }

  getProduct(id: string): Observable<IProduct> {
    return this.http.get<any>('assets/data/products.json').pipe(
      map((result) => <IProduct[]>result.data),
      map((filter) => filter.filter((item) => item.id === id)[0])
    );
  }
}
