import { Injectable, OnInit } from '@angular/core';
import {Http, Response, Headers, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IAd } from '../../body/ad-list/ad/ad.component';
import { BaseHttpService, IResponse } from './base-http.service';

@Injectable()
export class DataService extends BaseHttpService {
    private _adsDataUrl = '/ads-data';

    constructor(private _http: Http) {
        super();
     }

    getAds(userId?: string): Observable<IAd[]> {
        console.log('data.service getAds', userId);

        //var adsDataUrl = this._adsDataUrl;
        //console.log('url', userId ? adsDataUrl + `?userId=${userId}` : adsDataUrl);
        var params: URLSearchParams = new URLSearchParams();
        params.set('userId', userId);
        return this._http.get(this._adsDataUrl, userId ? { search: params } : {} )
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

    create(ad: IAd) : Observable<IResponse> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(this._adsDataUrl, JSON.stringify(ad), {headers: headers})
                                                .map((response: Response) => response.json());
        
    }
}
