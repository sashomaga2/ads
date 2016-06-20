import { Component, Injectable } from '@angular/core';
import { CanActivate, Router }   from '@angular/router';
import { AuthService }  from './../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _authService: AuthService,
                private router: Router){

    }
    canActivate() {
        if(this._authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/ads']);
        return false;
    }
}
