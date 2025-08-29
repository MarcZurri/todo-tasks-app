import { Directive, ElementRef, inject, Input, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  appHighlight = input('');
  private el = inject(ElementRef);

  constructor() {}

  ngOnChanges() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight();
  }
}
