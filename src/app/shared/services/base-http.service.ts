import { Http, Response } from '@angular/http';
import { ReflectiveInjector } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface IRestService {
    create(data: Object, msg: string) : boolean;
}

export abstract class BaseHttpService implements IRestService {
    
    constructor() {
    }

    abstract create(data: Object, msg: string) : boolean;

    protected handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
