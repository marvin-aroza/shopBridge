import { FormGroup } from '@angular/forms';

export function priceLimit(controlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        if (control.value > 10000) {
            control.setErrors({ price_limit: true });
        } else {
            control.setErrors(null);
        }
    }
}
