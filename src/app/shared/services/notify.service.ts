import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface INotify {
    msg: string;
    type: string;
    delay: number;
}

const MSG_TYPE = { SUCCESS: 'success', FAIL: 'danger' };
const MSG_DELAY_TIME = 5000;

@Injectable()
export class NotifyService {
    // Observable source
    private _notify = new BehaviorSubject<INotify>({ msg: '', type: '', delay: 0 });
    // Observable stream
    notify$ = this._notify.asObservable();

    constructor() { }

    showSuccess(msg: string){
        console.log('%c notify service next', 'color: green');
        this._notify.next({ msg: msg, type: MSG_TYPE.SUCCESS, MSG_DELAY_TIME});
    }

    showError(msg: string) {
        this._notify.next({ msg: msg, type: MSG_TYPE.FAIL, MSG_DELAY_TIME});
    }
}
