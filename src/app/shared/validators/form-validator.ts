import { Control } from '@angular/common';
import { ValidatorFn } from "@angular/common/src/forms/directives/validators";
import { Config } from "../../config/config";

export class FormValidator{

    static mailFormat(): ValidatorFn {
        return (control) => {
            if (control.value.length <= 5 || !Config.EMAIL_PATTERN.test(control.value)) {
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
