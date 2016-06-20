import { Component, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }   from '@angular/router';
import { AuthService }  from './../services/auth.service';
import { ProfileComponent }  from './../../body/profile/profile.component';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _authService: AuthService,
                private router: Router){

    }

    canActivate(next:  ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {

        var nextComponent: any = <any>next.component,
            profileComponent: any = <any>ProfileComponent,
            isProfileNext: boolean = nextComponent.name === profileComponent.name,
            isLogged: boolean = this._authService.isLoggedIn();

        if(isProfileNext && isLogged || !isProfileNext && !isLogged) {
            return true;
        }

        this.router.navigate(['/ads']);
        return false;
    }

}
