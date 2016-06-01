import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IAd } from '../../body/ad-list/ad/ad.component';


@Injectable()
export class DataService {
    private _adsDataUrl = '/ads-data';

    constructor(private _http: Http) { }

    getAds(): Observable<IAd[]> {
        return this._http.get(this._adsDataUrl)
          .map((response: Response) => <IAd[]> response.json())
          .do(data => console.log('All: ' +  JSON.stringify(data)))
          .catch(this.handleError);
    }

    getAd(id: string): Observable<IAd> {
        return this.getAds()
          .map((ads: IAd[]) => ads.find(ad => ad._id === id));
    }

    saveAd(ad: IAd) : boolean {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        console.log('saving ad', ad);
        //
        this._http.post(this._adsDataUrl, JSON.stringify(ad), {headers: headers}).subscribe((result)=> console.log('post result', result));
        return true;
    }

    private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
    }
}
