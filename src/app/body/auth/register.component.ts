import { Component, OnInit } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES } from '@angular/router';
import { FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators } from '@angular/common';
import { NavService } from './../../shared/services/nav.service';
import { AuthService } from './../../shared/services/auth.service';
import { AppRoutes } from './../../ads-app.component';
import { FormValidator } from './../../shared/validators/form-validator';

export interface IUser {
    _id?: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

@Component({
    moduleId: module.id,
    selector: 'app-register',
    templateUrl: 'register.component.html',
    //styleUrls: ['login.component.css']
    directives: [ROUTER_DIRECTIVES]
})
export class RegisterComponent implements OnInit, OnActivate {
    registerForm: ControlGroup;
    email: Control;
    firstName: Control;
    lastName: Control;
    password: Control;
    retypePassword: Control;
    submitAttempt: boolean = false;

    constructor(private _navService: NavService,
                private _authService: AuthService,
                private builder: FormBuilder) {
        this.email = new Control('', Validators.compose([Validators.required, FormValidator.mailFormat()]));
        this.firstName = new Control('', Validators.compose([Validators.required, Validators.minLength(2)]));
        this.lastName = new Control('', Validators.compose([Validators.required, Validators.minLength(2)]));
        this.password = new Control('', Validators.compose([Validators.required, Validators.minLength(6)]));
        this.retypePassword = new Control('', Validators.compose([Validators.required, FormValidator.passwordEqual(this.password)]));

        this.registerForm = builder.group({
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password,
            retypePassword: this.retypePassword
        });
    }


    _register(form: ControlGroup) :void {
        this.submitAttempt = true;
        console.log('%c register', 'color:green;' , form);
        this._authService.register(form.value);
        
        
    }

    //TODO Move to base class
    hasError(field) :Boolean {
        var valid = !this[field].valid && this.submitAttempt;
        return valid;
    }

    ngOnInit() {
    }

    routerOnActivate() {
        this._navService.changedRoute(AppRoutes.Register);
    }
}
