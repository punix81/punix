import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRandomColor]'
})
export class RandomColorDirective {
  el: ElementRef;

  constructor(el: ElementRef) {
    this.el = el;
    this.randomizeColor();
  }

  randomizeColor() {
    const randomColor = '#'
      + Math.floor(Math.random() * 16777215)
      .toString(16);
    this.el.nativeElement.style.color = randomColor;
  }
}
