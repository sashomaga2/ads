import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IAd } from '../../body/ad-list/ad/ad.component';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class DataService extends BaseHttpService {
    private _adsDataUrl = '/ads-data';

    constructor(private _http: Http) {
        super();
     }

    getAds(): Observable<IAd[]> {
        return this._http.get(this._adsDataUrl)
            .map((response: Response) => <IAd[]> response.json())
            .do(data => console.log('getAds: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAd(id: string): Observable<IAd> {
        return this._http.get(`${this._adsDataUrl}?id=${id}`)
            .map((response: Response) => <IAd[]> response.json()[0])
            .do(data => console.log('getAd: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    create(ad: IAd) : Observable<Response> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._adsDataUrl, JSON.stringify(ad), {headers: headers});
                            //.subscribe((result)=> console.log('post result', result));
        // TODO status
        //return true;
    }
}
