import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators } from '@angular/common';
import { IAd } from './../ad-list/ad/ad.component';

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

    constructor(private builder: FormBuilder) {
        this.title = new Control('', Validators.required);
        this.text = new Control('', Validators.compose([Validators.required, Validators.minLength(3)]));
        this.price = new Control('', Validators.required);

        this.adForm = builder.group({
            title: this.title,
            text: this.text,
            price: this.price
        });
    }

    hasError() :Boolean {
        var valid = !this.text.valid && this.submitAttempt;
        return valid;
    }

    _insertAd(form) :void {
        this.submitAttempt = true;
        this.insertAd.emit(form.value);
        console.log('data', form.value);
    }

    ngOnInit() {
    }

}
