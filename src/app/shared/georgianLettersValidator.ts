import { AbstractControl, ValidatorFn } from '@angular/forms';

export function georgianLettersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const georgianLettersRegex = /^[\u10D0-\u10FF]+$/; // Georgian Unicode range

    if (control.value && !georgianLettersRegex.test(control.value)) {
      return { georgianLetters: true };
    }
    return null;
  };
}
