import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseHttpService } from './base-http.service';
import { NotifyService } from './notify.service';

export interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export class User implements IUser {
    constructor(private _id: string = '',
                public email: string = '',
                public password: string = '',
                public firstName: string= '',
                public lastName: string = ''){
    }
}

@Injectable()
export class AuthService extends BaseHttpService {
    private _connectionUrl: string = '/register-api';
    private _loginUrl: string = '/login-api';
    private _loggedIn: boolean = false;

    constructor(private _http: Http,
                private _notify: NotifyService) {
        super();
    }

    //TODO implement
    logout() {
    }

    isLoggedIn() :boolean {
        return this._loggedIn;
    }

    login(user: User) : Observable<Response> {
        console.log('login ............');
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._loginUrl, JSON.stringify({email: user.email, password: user.password}), {headers: headers});
    }

    /* REGISTER */
    create(user: IUser) : Observable<Response> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._connectionUrl, JSON.stringify(user), {headers: headers});
    }
}
