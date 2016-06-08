import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IUser } from './../../body/auth/register.component';
import { BaseHttpService } from './base-http.service';
import { NotifyService } from './notify.service';

@Injectable()
export class AuthService extends BaseHttpService {
    private _connectionUrl = '/register-api';

    constructor(private _http: Http,
                private _notify: NotifyService) {
        super();
    }

    create(user: IUser, successMsg) : boolean {
        console.log('create auth');
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this._http.post(this._connectionUrl, JSON.stringify(user), {headers: headers})
            .subscribe(
                (response: Response) => {
                    let result = response.json();
                    if(result.status){
                        this._notify.showSuccessMsg(successMsg);    
                    }else{
                        this._notify.showErrorMsg(result.error);
                    }
                    
                },
                //TODO check erorrs
                error =>  this.handleError(error)
            );
        // TODO status
        return true;
    }
}
