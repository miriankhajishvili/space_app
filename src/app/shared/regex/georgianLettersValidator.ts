import { AbstractControl, ValidatorFn } from '@angular/forms';

export function singleLanguageValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputValue = control.value;


    // Check if input contains both English and Georgian letters
    const containsEnglish = /[a-zA-Z]/.test(inputValue);
    const containsGeorgian = /[\u10D0-\u10FF]/.test(inputValue);

    if (containsEnglish && containsGeorgian) {
      return { singleLanguage: true }; // Return error if both languages are present
    }

    return null; // Return null if input is valid
  };
}
