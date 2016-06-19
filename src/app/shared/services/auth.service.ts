import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseHttpService, IResponse } from './base-http.service';
import { NotifyService } from './notify.service';


export interface IUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export class User implements IUser {
    constructor(public _id: string = '',
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
    private _user: User;

    // Observable source
    private _loginStatus = new BehaviorSubject<boolean>(false); //trigger event
    // Observable stream
    loginStatus$ = this._loginStatus.asObservable();

    constructor(private _http: Http,
                private _notify: NotifyService) {
        super();
    }



    //TODO implement
    logout() {
    }

    _setLoginStatus(isLogged: boolean) : void {
        this._loggedIn = isLogged;
        this._loginStatus.next(isLogged);
    }

    _initLoginStatus() {

    }
    
    checkLogin(): Observable<IResponse> {
        console.log('check loggin!!!');
        return this._http.get('/login-check')
            .map((response: Response) => response.json())
            .do((response: IResponse) =>  {
                if(response.status) {
                    this._user = new User('12345', 'sas@abv.bg', '', 'Sasho', 'Marinov');
                    this._setLoginStatus(true);
                }
            });
    }

    isLoggedIn() :boolean {
        return this._loggedIn;
    }

    getLoggedUser() : User {
        return this._user;
    }

    login(user: User) : Observable<IResponse> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._loginUrl, JSON.stringify({email: user.email, password: user.password}), {headers: headers})
            .map((response: Response) => response.json())
            .do((response: IResponse) =>  {
                if(response.status) {
                    this._user = new User('12345', 'sas@abv.bg', '', 'Sasho', 'Marinov');
                    this._setLoginStatus(true);
                }
            });
    }

    /* REGISTER */
    create(user: IUser) : Observable<IResponse> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._connectionUrl, JSON.stringify(user), {headers: headers})
            .map((response: Response) => response.json());
    }
}
