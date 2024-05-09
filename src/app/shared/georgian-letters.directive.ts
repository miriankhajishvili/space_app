import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appGeorgianLetters]',
  standalone: true
})
export class GeorgianLettersDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    const inputValue = this.el.nativeElement.value;
    const georgianLettersRegex = /^[\u10D0-\u10FF]+$/; // Georgian Unicode range
    const englishLettersRegex = /^[a-zA-Z]+$/; // English letters range
    
    if (!georgianLettersRegex.test(inputValue) && !englishLettersRegex.test(inputValue)) {
      this.el.nativeElement.value = inputValue.slice(0, -1); // Remove the last character if it's not valid
    }
  }

}
