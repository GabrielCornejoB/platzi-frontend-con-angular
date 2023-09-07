import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  private element = inject(ElementRef);

  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.background = 'green';
  }

  constructor() {
    this.element.nativeElement.style.background = 'yellow';
  }
}
