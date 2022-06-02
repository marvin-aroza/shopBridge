import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNumberCheck]'
})
export class NumberCheckDirective {

  constructor(
    private elemRef: ElementRef,
  ) {
  }

  // listens on blur of the input field
  @HostListener('blur')
  @HostListener('keyup')
  checkNumberValidation() {
    // replace alphabets with empty character
    this.elemRef.nativeElement.value = this.elemRef.nativeElement.value.replace(/[^0-9.]+/g,'');
  }

}
