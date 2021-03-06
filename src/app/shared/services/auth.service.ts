import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseHttpService, IResponse } from './base-http.service';

export interface IUser {
    _id: string
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

    constructor(private _http: Http) {
        super();
    }

    //TODO implement
    logout() {
    }

    _setLoginStatus(isLogged: boolean) : void {
        this._loggedIn = isLogged;
        this._loginStatus.next(isLogged);
    }
    
    checkLogin(): Observable<IResponse> {
        return this._http.get('/login-check')
            .map((response: Response) => response.json())
            .do((response: IResponse) =>  {
                if(response.status) {
                    let user = <IUser>response.data;
                    this._user = new User(user._id, user.email, '', user.firstName, user.lastName);
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
                    let user = <IUser>response.data;
                    this._user = new User(user._id, user.email, '', user.firstName, user.lastName);
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
