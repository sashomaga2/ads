import { Component, OnInit, ContentChild } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import 'rxjs/Rx';
import { AdListComponent } from './body/ad-list/ad-list.component';
import { HeaderComponent } from './header/header.component';
import { NewAdComponent } from './body/new-ad/new-ad.component';
import { DataService, NavService, AuthService, NotifyService } from './shared/services/index';

export const enum AppRoutes {Ads, NewAd, AdDetail, Login, Register, Profile};

@Component({
    moduleId: module.id,
    selector: 'ads-app',
    templateUrl: 'ads-app.component.html',
    styleUrls: ['ads-app.component.css'],
    directives: [AdListComponent, HeaderComponent, ROUTER_DIRECTIVES],
    providers: [DataService, NavService, NotifyService]
})
export class AdsAppComponent implements OnInit {
     title = 'ads-app!';

    @ContentChild (NewAdComponent) newAd: NewAdComponent;

    constructor(private _authService: AuthService) {
    }

    componentAfterViewChange() {
        console.log('componentAfterViewChange', this.newAd);
    }

    ngOnInit() {
        this._authService.checkLogin().subscribe(
            item => { console.log('Login response:', item) },
            error =>  { console.error(error); }
        );
    }

    OnInsertAdd(ad) {
        console.log("OnInsertAdd", ad);
    }
}
