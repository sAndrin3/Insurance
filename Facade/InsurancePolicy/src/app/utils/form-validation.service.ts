import { Injectable } from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  getErrorMessage(control: AbstractControl | null, controlName: string): string | null {
    if (!control) return null;

    if (control.touched && control.invalid) {
      if (control.hasError('required')) {
        return `${controlName} is required.`;
      }
      if (control.hasError('pattern')) {
        return `${controlName} is not valid.`;
      }
      if (control.hasError('minlength')) {
        return `${controlName} must be at least ${control.getError('minlength').requiredLength} characters long.`;
      }
      if (control.hasError('maxlength')) {
        return `${controlName} cannot be longer than ${control.getError('maxlength').requiredLength} characters.`;
      }
    }
    return null;
  }
}
