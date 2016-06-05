import { FormBuilder, ControlGroup, Control } from '@angular/common';
import { ReflectiveInjector } from '@angular/core';
import { IRestService } from './../services/base-http.service';

export abstract class BaseForm {
    submitAttempt: boolean = false;
    form: ControlGroup;
    protected _restService: IRestService;
    protected _builder: FormBuilder;

    constructor(){
        var injector = ReflectiveInjector.resolveAndCreate([
            FormBuilder
        ]);

        this._builder = injector.get(FormBuilder);
    }

    _clearForm() :void {
        var controls = this.form.controls;
        for (let name in controls) {
            (<Control>controls[name]).updateValue('', {});
        }
    }

    hasError(field) :Boolean {
        return !this[field].valid && this.submitAttempt;
    }

    send(form: ControlGroup) :void {
       this.submitAttempt = true;
    
       if(form.valid) { //send over
           this.submitAttempt = false;
           this._restService.create(form.value);
           this._clearForm();
       } else { //
       }
    }
}
