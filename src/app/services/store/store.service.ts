import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private shoppingCart: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  public cart$ = this.cart.asObservable();

  constructor() {}

  // Se debería pasar una copia porque en JS los arreglos pasan por referencia
  public getShoppingCart(): Product[] {
    return this.shoppingCart;
  }

  public addProduct(product: Product): void {
    this.shoppingCart.push(product);
    this.cart.next(this.shoppingCart);
  }
  public getTotal(): number {
    return this.shoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
