import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from '../../../../node_modules/rxjs/Observable';
import { IAd } from './../../core/add/ad.component';


@Injectable()
export class DataService {
  private _productUrl = 'app/ads.json';

  constructor(private _http: Http) { }

  getAds(): Observable<IAd[]> {
    return this._http.get(this._productUrl)
      .map((response: Response) => <IAd[]> response.json())
      .do(data => console.log('All: ' +  JSON.stringify(data)))
      .catch(this.handleError);
  }

  getAd(id: number): Observable<IAd> {
    return this.getAds()
      .map((products: IAd[]) => products.find(p => p.id === id));
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
