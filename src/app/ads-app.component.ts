import { Component, OnInit } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { ListComponent } from './core/list/list.component';
import { HeaderComponent } from './core/header/header.component';
import { NewAdComponent } from "./core/new-ad/new-ad.component";
import { AdDetailComponent } from "./core/ad-detail/ad-detail.component";
import { HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'ads-app',
    templateUrl: 'ads-app.component.html',
    styleUrls: ['ads-app.component.css'],
    directives: [ListComponent, HeaderComponent, ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})
@Routes([
    {path: '/ads',  component: ListComponent},
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
