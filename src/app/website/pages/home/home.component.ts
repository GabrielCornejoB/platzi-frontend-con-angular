import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private productsService = inject(ProductsService);

  products: Product[] = [];
  limit: number = 10;
  offset: number = 0;

  ngOnInit(): void {
    this.loadPaginatedProducts();
  }

  loadPaginatedProducts() {
    this.productsService
      .getProductsByPage(this.limit, this.offset)
      .subscribe((data) => {
        this.products =
          this.products.length === 0 ? data : this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
