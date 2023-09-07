import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, retry, throwError, map, tap } from 'rxjs';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/app/models/product.model';
import { enableTimeInterceptor } from '../../interceptors/time.interceptor';

import { environment as env } from '../../../environments/environment';

const API_URL = `${env.API_URL}/api/v1`;

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
    return this.http
      .get<Product[]>(`${API_URL}/products`, {
        params: {
          limit,
          offset,
        },
        context: enableTimeInterceptor(),
      })
      .pipe(
        retry(3),
        map((products) =>
          products.map((p) => ({ ...p, taxes: 0.19 * p.price }))
        ),
        tap((products) => console.log(products))
      );
  }

  getProductsByCategory(categoryId: string, limit: number, offset: number) {
    return this.http.get<Product[]>(
      `${API_URL}/categories/${categoryId}/products`,
      {
        params: {
          limit,
          offset,
        },
      }
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) return throwError('Error en el server');
        if (error.status === 404) return throwError('Error pq no existe');
        return throwError('Error timidito');
      })
    );
  }

  createProduct(dto: CreateProductDTO): Observable<Product> {
    return this.http.post<Product>(`${API_URL}/products`, dto);
  }

  updateProduct(id: number, dto: UpdateProductDTO): Observable<Product> {
    return this.http.put<Product>(`${API_URL}/products${id}`, dto);
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${API_URL}/products${id}`);
  }
}
