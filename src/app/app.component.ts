import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showAlert(error: number) {
    console.log('log parent', error);
  }

  products: Product[] = [
    {
      id: 1,
      name: 'Silla 1',
      image:
        'https://www.rimax.com.co/media/catalog/product/cache/59e5c732db92a740d29f32bacf696cea/1/5/1578_4.jpg',
      price: 10000,
    },
    {
      id: 2,
      name: 'Silla 2',
      image:
        'https://www.rimax.com.co/media/catalog/product/cache/59e5c732db92a740d29f32bacf696cea/1/5/1578_4.jpg',
      price: 15000,
    },
    {
      id: 3,
      name: 'Silla 3',
      image:
        'https://www.rimax.com.co/media/catalog/product/cache/59e5c732db92a740d29f32bacf696cea/1/5/1578_4.jpg',
      price: 5000,
    },
    {
      id: 4,
      name: 'Silla 4',
      image:
        'https://www.rimax.com.co/media/catalog/product/cache/59e5c732db92a740d29f32bacf696cea/1/5/1578_4.jpg',
      price: 100000,
    },
  ];
}
