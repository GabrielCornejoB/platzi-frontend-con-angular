import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  private aRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  productId: string | null = null;
  product: Product | null = null;

  ngOnInit(): void {
    this.aRoute.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          if (this.productId)
            return this.productsService.getProduct(parseInt(this.productId));
          return of({} as Product);
        })
      )
      .subscribe((data) => {
        this.product = data;
        console.log(data);
      });
  }
}
