import { Control } from '@angular/common';
import { ValidatorFn } from "@angular/common/esm/src/forms/directives/validators";

export class FormValidator{

    static mailFormat(): ValidatorFn {
        return (control) => {
            var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

            console.log('control', control.value);
            if (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value)) {
                return { "incorrectMailFormat": true };
            }

            return null;
        }
    }

    static passwordEqual(passControl: Control): ValidatorFn {
        return (control) => {
            if (control.value !== passControl.value) {
                return { "passwordsNotMatch": true };
            }

            return null;
        }
    }
}