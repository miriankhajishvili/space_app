import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputValue = control.value;

    // Check if input value is empty or contains only whitespace
    if (!inputValue || /^\s*$/.test(inputValue)) {
      return { emptySpace: true }; // Return error if empty or whitespace
    }

    // Check if input starts with the number 5
    if (!/^5/.test(inputValue)) {
      return { startsWithFive: true }; // Return error if number doesn't start with 5
    }

    // Check if input contains exactly 9 digits
    if (!/^\d{9}$/.test(inputValue)) {
      return { invalidDigits: true }; // Return error if digits are not 9
    }

    return null; // Return null if input is valid
  };
}
