import { Component, OnInit, inject } from '@angular/core';
import { switchMap, zip } from 'rxjs';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/app/models/product.model';
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
  shoppingCart: Product[] = [];
  total: number = 0;

  activeProductDetails: Product = {
    id: 0,
    images: [],
    title: '',
    price: 0,
    category: { id: 0, name: '' },
    description: '',
  };
  isProductDetailActive: boolean = false;

  limit: number = 10;
  offset: number = 0;

  requestStatus: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor() {
    this.shoppingCart = this.storeService.getShoppingCart();
  }
  ngOnInit(): void {
    this.loadPaginatedProducts();

    // this.productsService.getAllProducts().subscribe((res) => {
    //   this.products = res;
    // });
  }

  addToCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  readAndUpdate(id: number) {
    // this.productsService
    //   .getProduct(id)
    //   .pipe(
    //     switchMap((product) =>
    //       this.productsService.updateProduct(product.id, { title: 'change' })
    //     )
    //   )
    //   .subscribe((data) => {
    //     console.log(data);
    //   });

    zip(
      this.productsService.getProduct(id),
      this.productsService.updateProduct(id, { title: 'another change' })
    ).subscribe((res) => console.log(res));
  }

  toggleProductDetails() {
    this.isProductDetailActive = !this.isProductDetailActive;
  }

  getProductDetails(id: number) {
    this.requestStatus = 'loading';
    this.productsService.getProduct(id).subscribe(
      (product) => {
        this.toggleProductDetails();
        this.activeProductDetails = product;
        this.requestStatus = 'success';
      },
      (error) => {
        console.log(error);
        this.requestStatus = 'error';
      }
    );
  }

  createNewProduct() {
    const newProduct: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'Descripción del nuevo producto',
      price: 1000,
      categoryId: 2,
      images: [
        'https://www.rimax.com.co/media/catalog/product/cache/59e5c732db92a740d29f32bacf696cea/2/5/2534_1.jpg',
      ],
    };
    this.productsService.createProduct(newProduct).subscribe((product) => {
      console.log({ product });
      this.products.unshift(product);
    });
  }

  updateProduct() {
    const productChanges: UpdateProductDTO = {
      title: 'Nuevo titulo',
      price: 999999,
    };
    this.productsService
      .updateProduct(this.activeProductDetails.id, productChanges)
      .subscribe((product) => {
        this.toggleProductDetails();
        console.log(product);
        const productIndex = this.products.findIndex(
          (p) => p.id === this.activeProductDetails.id
        );
        this.products[productIndex] = { ...product };
      });
  }

  deleteProduct() {
    this.productsService
      .deleteProduct(this.activeProductDetails.id)
      .subscribe(() => {
        const productIndex = this.products.findIndex(
          (p) => p.id === this.activeProductDetails.id
        );
        this.products.splice(productIndex, 1);
        this.toggleProductDetails();
      });
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
