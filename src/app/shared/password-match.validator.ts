import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Cross-field validator: ensures `confirmPasswordKey` matches `passwordKey`.
 * Attach at the FormGroup level, e.g.:
 *   this.fb.group({ password: [...], confirmPassword: [...] },
 *     { validators: passwordMatchValidator('password', 'confirmPassword') })
 */
export function passwordMatchValidator(
  passwordKey: string,
  confirmPasswordKey: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey)?.value;
    const confirmPassword = group.get(confirmPasswordKey)?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    if (password !== confirmPassword) {
      group.get(confirmPasswordKey)?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    // Clear the error if a previous mismatch has been fixed
    const confirmControl = group.get(confirmPasswordKey);
    if (confirmControl?.hasError('passwordMismatch')) {
      confirmControl.setErrors(null);
    }

    return null;
  };
}