import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  private aRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  categoryId: string | null = null;
  products: Product[] = [];
  limit: number = 10;
  offset: number = 0;

  ngOnInit(): void {
    this.aRoute.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');
          if (this.categoryId)
            return this.productsService.getProductsByCategory(
              this.categoryId,
              this.limit,
              this.offset
            );
          else return [];
        })
      )
      .subscribe((data) => {
        this.products = data;
        this.offset += this.limit;
      });
  }

  loadPaginatedProducts() {
    if (this.categoryId)
      this.productsService
        .getProductsByCategory(this.categoryId, this.limit, this.offset)
        .subscribe((data) => {
          this.products =
            this.products.length === 0 ? data : this.products.concat(data);
          this.offset += this.limit;
        });
  }
}
