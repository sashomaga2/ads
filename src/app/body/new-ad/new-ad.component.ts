import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators } from '@angular/common';
import { IAd } from './../ad-list/ad/ad.component';
import { DataService } from './../../shared/services/data.service';
import { AuthService } from './../../shared/services/auth.service';
import { BaseForm } from './../../shared/form/base-form';
import { NotifyService } from './../../shared/services/notify.service';

@Component({
  moduleId: module.id,
  selector: 'app-new-ad',
  templateUrl: 'new-ad.component.html',
  styleUrls: ['new-ad.component.css']
})
export class NewAdComponent extends BaseForm implements OnInit {
    title: Control;
    text: Control;
    price: Control;
    successMsg: string;

    @Output() insertAd: EventEmitter<IAd> =
        new EventEmitter<IAd>();

    constructor(private _dataService: DataService,
                protected _notify: NotifyService,
                private _authService: AuthService) {
        super(_notify);
        this._restService = _dataService;
        this.title = new Control('', Validators.compose([Validators.required, Validators.minLength(3)]));
        this.text = new Control('', Validators.compose([Validators.required, Validators.minLength(3)]));
        this.price = new Control('', Validators.compose([Validators.required, Validators.pattern('\\d+\\.?\\d{0,2}')]));

        this.form = this._builder.group({
            title: this.title,
            text: this.text,
            price: this.price
        });
    }

    send(form: ControlGroup) {
        this.successMsg = `Ad ${this.title.value} saved successfully`;
        if(this._authService.isLoggedIn()){
            Object.assign(form.value, { userId: this._authService.getLoggedUser()._id } );
        }
        super.send(form);
    }

    ngOnInit() {
    }

}
