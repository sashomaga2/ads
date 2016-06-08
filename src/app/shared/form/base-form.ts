import { FormBuilder, ControlGroup, Control } from '@angular/common';
import { ReflectiveInjector } from '@angular/core';
import { IRestService } from './../services/base-http.service';
import { NotifyService } from './../services/notify.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export abstract class BaseForm {
    submitAttempt: boolean = false;
    form: ControlGroup;
    protected _restService: IRestService;
    protected _builder: FormBuilder;
    successMsg: string = '';

    constructor(protected _notify: NotifyService){
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

        //if(form.valid) { //TODO uncomment
            this.submitAttempt = false;
            this._restService.create(form.value)
                .subscribe(
                    (response: Response) => {
                        let result = response.json();
                        if(result.status){
                            this._notify.showSuccessMsg(this.successMsg);
                        }else{
                            this._notify.showErrorMsg(result.error);
                        }

                    },
                    //TODO check erorrs
                    error =>  this.handleError(error)
            );
            this._clearForm();
        //}
    }

    protected handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
