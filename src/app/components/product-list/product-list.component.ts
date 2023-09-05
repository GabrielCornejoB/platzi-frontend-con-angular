import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products/products.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  private storeService = inject(StoreService);
  private productsService = inject(ProductsService);

  products: Product[] = [];
  total: number = 0;
  shoppingCart: Product[] = [];

  constructor() {
    this.shoppingCart = this.storeService.getShoppingCart();
  }
  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((res) => {
      this.products = res;
    });
  }

  addToCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
