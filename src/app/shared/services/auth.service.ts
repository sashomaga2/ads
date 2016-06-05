import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IUser } from './../../body/auth/register.component';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class AuthService extends BaseHttpService {
    private _connectionUrl = '/register-api';

    constructor(private _http: Http) { 
        super();
    }

    create(user: IUser) : boolean {
        console.log('create auth');
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this._http.post(this._connectionUrl, JSON.stringify(user), {headers: headers})
            .subscribe((result)=> console.log('post result', result));
        // TODO status
        return true;
    }
}
