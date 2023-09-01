import { Component, EventEmitter, Input, Output } from '@angular/core';

const defaultImage = 'favicon.ico';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input() alt: string = '';
  @Input() url: string = '';
  @Output() loaded = new EventEmitter<number>();

  error() {
    this.url = defaultImage;
  }

  imageLoaded() {
    console.log('log hijo');
    this.loaded.emit(404);
  }
}
