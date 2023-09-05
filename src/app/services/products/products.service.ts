import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, retry } from 'rxjs';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/app/models/product.model';

// Link antiguo
// const API_URL = 'https://young-sands-07814.herokuapp.com/api/products';
const API_URL = 'https://api.escuelajs.co/api/v1/products/';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  constructor() {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL);
  }

  getProductsByPage(limit: number, offset: number): Observable<Product[]> {
    // let params = new HttpParams();
    // params.set('limit', limit)
    // params.set('offset',)
    return this.http
      .get<Product[]>(API_URL, {
        params: {
          limit,
          offset,
        },
      })
      .pipe(retry(3));
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}${id}`);
  }

  createProduct(dto: CreateProductDTO): Observable<Product> {
    return this.http.post<Product>(`${API_URL}`, dto);
  }

  updateProduct(id: number, dto: UpdateProductDTO): Observable<Product> {
    return this.http.put<Product>(`${API_URL}${id}`, dto);
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${API_URL}${id}`);
  }
}
