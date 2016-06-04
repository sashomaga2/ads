import { FormBuilder } from '@angular/common';
import { ReflectiveInjector } from '@angular/core';

export class BaseForm {
    submitAttempt: boolean = false;
    form: ControlGroup;

    protected _builder: FormBuilder;

    constructor(){
        var injector = ReflectiveInjector.resolveAndCreate([
            FormBuilder
        ]);

        this._builder = injector.get(FormBuilder);
    }

    hasError(field) :Boolean {
        return !this[field].valid && this.submitAttempt;
    }
}
