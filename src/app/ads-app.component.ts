import { Component, OnInit } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { AdListComponent } from './body/ad-list/ad-list.component';
import { HeaderComponent } from './header/header.component';
import { NewAdComponent } from "./body/new-ad/new-ad.component";
import { AdDetailComponent } from "./body/ad-detail/ad-detail.component";

@Component({
    moduleId: module.id,
    selector: 'ads-app',
    templateUrl: 'ads-app.component.html',
    styleUrls: ['ads-app.component.css'],
    directives: [AdListComponent, HeaderComponent, ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})
@Routes([
    {path: '/ads',  component: AdListComponent},
    {path: '/newAd',  component: NewAdComponent},
    {path: '/adDetail/:id',  component: AdDetailComponent},
])
export class AdsAppComponent implements OnInit {
    title = 'ads-app!';

    constructor(private _router: Router) {}

    ngOnInit() {
        this._router.navigate(['/ads']);
    }
}
