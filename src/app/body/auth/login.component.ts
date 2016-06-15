import { Component, OnInit } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Response } from '@angular/http';
import { NavService } from './../../shared/services/nav.service';
import { AuthService, User } from './../../shared/services/auth.service';
import { AppRoutes } from './../../ads-app.component';
import { Config } from "./../../config/config";

/* Simple form with without Form Builder */
@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    //styleUrls: ['login.component.css']
    directives: [ROUTER_DIRECTIVES]
})
export class LoginComponent implements OnInit, OnActivate {
    user: User = new User();
    submitAttempt: boolean = false;

    constructor(private _navService: NavService,
                private _authService: AuthService,
                private _router: Router) {
    }

    isValid() :boolean {
        return this.validateEmail() && !!this.user.password.length;
    }

    login() {
        this.submitAttempt = true;
        if(this.isValid()) {
            this._authService.login(this.user)
                .subscribe(
                    (response: Response) => {
                        if(response.status){
                            console.log('success login');
                            this._router.navigate(['/profile']);
                            //this._notify.showSuccessMsg(successMsg);
                        }else{
                            console.log('fail login');
                            //this._notify.showErrorMsg(result.error);
                        }

                    }
                    //TODO check erorrs
                    //error => console.error(error)
                );
        }
    }

    validateEmail(): boolean {
        return Config.EMAIL_PATTERN.test(this.user.email);
    }

    ngOnInit() {
    }

    routerOnActivate() {
        this._navService.changedRoute(AppRoutes.Login);
    }
}