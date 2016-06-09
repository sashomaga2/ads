import { Http, Response } from '@angular/http';
import { ReflectiveInjector } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export enum Status { FAIL = 0, SUCCESS };

export interface IResponse {
    status: Status,
    error?: string,
    data?: Object[]
}

export interface IRestService {
    create(data: Object) : Observable<IResponse>;
}

export abstract class BaseHttpService implements IRestService {
    
    constructor() {
    }

    abstract create(data: Object) : Observable<IResponse>;

    protected handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
