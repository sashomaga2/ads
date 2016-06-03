import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IUser } from './../../body/auth/register.component';

@Injectable()
export class AuthService {
    private _connectionUrl = '/register-api';

    constructor(private _http: Http) { }

    //getAds(): Observable<string> {
    //    return this._http.get(this._adsDataUrl)
    //        .map((response: Response) => <IAd[]> response.json())
    //        .do(data => console.log('getAds: ' +  JSON.stringify(data)))
    //        .catch(this.handleError);
    //}
    //
    //getAd(id: string): Observable<IAd> {
    //    return this._http.get(`${this._adsDataUrl}?id=${id}`)
    //        .map((response: Response) => <IAd[]> response.json()[0])
    //        .do(data => console.log('getAd: ' +  JSON.stringify(data)))
    //        .catch(this.handleError);
    //}

    saveAd(user: IUser) : boolean {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this._http.post(this._connectionUrl, JSON.stringify(user), {headers: headers})
            .subscribe((result)=> console.log('post result', result));
        // TODO status
        return true;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
