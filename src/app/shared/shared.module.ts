import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ImageComponent } from './components/image/image.component';
import { HighlightDirective } from './directives/highlight.directive';
import { ReversePipe } from './pipes/reverse.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ImageComponent,
    HighlightDirective,
    ReversePipe,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ProductComponent,
    ProductListComponent,
    ImageComponent,
    HighlightDirective,
    ReversePipe,
  ],
})
export class SharedModule {}
