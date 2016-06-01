import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class NavService {
    // Observable navItem source
    private _selectedRoute = new BehaviorSubject<number>(0);
    // Observable navItem stream
    selectedRoute$ = this._selectedRoute.asObservable();

    constructor() { }

    changeRoute(index: number) : void {
        this._selectedRoute.next(index);
    }
}
