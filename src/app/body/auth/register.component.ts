import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators } from '@angular/common/src/forms-deprecated';
import { NavService } from './../../shared/services/nav.service';
import { AuthService } from './../../shared/services/auth.service';
import { AppRoutes } from './../../ads-app.component';
import { FormValidator } from './../../shared/validators/form-validator';
import { BaseForm } from './../../shared/form/base-form';
import { Config } from "../../config/config";
import { NotifyService } from './../../shared/services/notify.service';

@Component({
    moduleId: module.id,
    selector: 'app-register',
    templateUrl: 'register.component.html',
    //styleUrls: ['login.component.css']
    directives: [ROUTER_DIRECTIVES]
})
export class RegisterComponent extends BaseForm implements OnInit {
    email: Control;
    firstName: Control;
    lastName: Control;
    password: Control;
    retypePassword: Control;

    private sub: any; 

    constructor(private _navService: NavService,
                private _authService: AuthService,
                protected _notify: NotifyService,
                private _router: Router) {
        super(_notify);
        this._restService = _authService;
        this.email = new Control('', Validators.compose([Validators.required, FormValidator.mailFormat()]));
        this.firstName = new Control('', Validators.compose([Validators.required, Validators.minLength(Config.MIN_NAME_LENGTH)]));
        this.lastName = new Control('', Validators.compose([Validators.required, Validators.minLength(Config.MIN_NAME_LENGTH)]));
        this.password = new Control('', Validators.compose([Validators.required, Validators.minLength(Config.MIN_PASSWORD_LENGTH)]));
        this.retypePassword = new Control('', Validators.compose([Validators.required, FormValidator.passwordEqual(this.password)]));

        this.form = this._builder.group({
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password,
            retypePassword: this.retypePassword
        });
    }

    send(form: ControlGroup) {
        this.successMsg = `User: ${this.firstName.value} ${this.lastName.value} has been registered.`;
        super.send(form);
    }

    ngOnInit() {
        this.sub = this._router
            .routerState
            .queryParams
            .subscribe(params => {
                 this._navService.changedRoute(AppRoutes.Register);
            });
    }

    // routerOnActivate() {
    //     this._navService.changedRoute(AppRoutes.Register);
    // }
}
