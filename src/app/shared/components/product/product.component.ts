import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input({ required: true }) product: Product = {
    id: 0,
    images: [],
    title: '',
    price: 0,
    category: { id: 0, name: '' },
    description: '',
  };
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProductDetails = new EventEmitter<number>();

  addToCart() {
    this.addedProduct.emit(this.product);
  }
  showDetails() {
    this.showProductDetails.emit(this.product.id);
  }
}
