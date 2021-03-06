import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppRoutes } from './../../ads-app.component';


@Injectable()
export class NavService {
    // Observable navItem source
    private _selectedRoute = new BehaviorSubject<AppRoutes>(0);
    // Observable navItem stream
    selectedRoute$ = this._selectedRoute.asObservable();

    constructor() { }

    changedRoute(index: number) : void {
        this._selectedRoute.next(index);
    }
}
