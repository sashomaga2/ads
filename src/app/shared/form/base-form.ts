import { FormBuilder, ControlGroup, Control } from '@angular/common';
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

    _clear() :void {
        var controls = this.form.controls;
        for (let name in controls) {
            let control: Control = <Control>controls[name];
            control.updateValue('', {});
        }
    }

    hasError(field) :Boolean {
        return !this[field].valid && this.submitAttempt;
    }

    //send(form: ControlGroup) :void {
    //    this.submitAttempt = true;
    //
    //    if(form.valid) { //send over
    //        this.submitAttempt = false;
    //        this._dataService.saveAd(form.value);
    //        this._clear();
    //    } else { //
    //
    //    }
    //}
}
