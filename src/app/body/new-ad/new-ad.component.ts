import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators } from '@angular/common';
import { IAd } from './../ad-list/ad/ad.component';
import { DataService } from './../../shared/services/data.service';

@Component({
  moduleId: module.id,
  selector: 'app-new-ad',
  templateUrl: 'new-ad.component.html',
  styleUrls: ['new-ad.component.css']
})
export class NewAdComponent implements OnInit {
    adForm: ControlGroup;
    title: Control;
    text: Control;
    price: Control;
    submitAttempt: boolean = false;

    @Output() insertAd: EventEmitter<IAd> =
        new EventEmitter<IAd>();

    constructor(private builder: FormBuilder,
                private _dataService: DataService) {
        this.title = new Control('', Validators.compose([Validators.required, Validators.minLength(3)]));
        this.text = new Control('', Validators.compose([Validators.required, Validators.minLength(3)]));
        this.price = new Control('', Validators.compose([Validators.required, Validators.pattern('\\d+\\.?\\d{0,2}')]));

        this.adForm = builder.group({
            title: this.title,
            text: this.text,
            price: this.price
        });
    }

    hasError(field) :Boolean {
        var valid = !this[field].valid && this.submitAttempt;
        return valid;
    }

    _clearForm(form) :void {
        var controls = form.controls;
        for (let name in controls) {
            let control = controls[name];
            control.updateValue('');
            //control.setErrors(null);
        }
    }

    _insertAd(form) :void {
        this.submitAttempt = true;

        if(form.valid) { //send over
            this.insertAd.emit(form.value);
            this.submitAttempt = false;
            this._dataService.saveAd(form.value);
            this._clearForm(form);
        } else { //

        }
    }

    ngOnInit() {
    }

}
