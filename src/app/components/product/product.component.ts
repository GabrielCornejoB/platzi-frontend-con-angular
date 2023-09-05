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
    image: '',
    title: '',
    price: 0,
    category: '',
    description: '',
  };
  @Output() addedProduct = new EventEmitter<Product>();

  addToCart() {
    this.addedProduct.emit(this.product);
  }
}
