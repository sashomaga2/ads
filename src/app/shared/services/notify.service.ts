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

    showSuccessMsg(msg: string){
        this._notify.next({ msg: msg, type: MSG_TYPE.SUCCESS, delay: MSG_DELAY_TIME});
    }

    showErrorMsg(msg: string) {
        this._notify.next({ msg: msg, type: MSG_TYPE.FAIL, delay: MSG_DELAY_TIME});
    }
}
