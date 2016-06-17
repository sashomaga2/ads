import { Component, OnInit, ContentChild } from '@angular/core';
import { OnActivate, RouteSegment, Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { AdListComponent } from './body/ad-list/ad-list.component';
import { HeaderComponent } from './header/header.component';
import { NewAdComponent } from './body/new-ad/new-ad.component';
import { AdDetailComponent } from './body/ad-detail/ad-detail.component';
import { LoginComponent } from './body/auth/login.component';
import { RegisterComponent } from './body/auth/register.component';
import { ProfileComponent } from './body/profile/profile.component';
import { DataService } from './shared/services/data.service';
import { NavService } from './shared/services/nav.service';
import { AuthService } from './shared/services/auth.service';
import { NotifyService } from './shared/services/notify.service';

export const enum AppRoutes {Ads, NewAd, AdDetail, Login, Register, Profile};

@Component({
    moduleId: module.id,
    selector: 'ads-app',
    templateUrl: 'ads-app.component.html',
    styleUrls: ['ads-app.component.css'],
    directives: [AdListComponent, HeaderComponent, ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS, DataService, NavService, AuthService, NotifyService]
})
@Routes([
    {path: '/ads',  component: AdListComponent},
    {path: '/newAd',  component: NewAdComponent},
    {path: '/adDetail/:id',  component: AdDetailComponent},
    //TODO use CanActivate 
    {path: '/login',  component: LoginComponent},
    //TODO use CanActivate
    {path: '/register',  component: RegisterComponent},
    //TODO use CanActivate
    {path: '/profile',  component: ProfileComponent},
    {path: '*',  component: AdListComponent},
    //TODO fix
    {path: '/',  component: AdListComponent},
])
export class AdsAppComponent implements OnInit, OnActivate {
    title = 'ads-app!';

    @ContentChild (NewAdComponent) newAd: NewAdComponent;

    constructor(private _router: Router,
                private _authService: AuthService) {
        this._router.changes.subscribe((...data)=>{
            // console.log('data', data);
            // console.log('this.newAd', this.newAd);
            if(this.newAd){
                this.newAd.insertAd.subscribe((ad)=>console.log('subscribe', ad));
            }
        });
    }

    componentAfterViewChange() {
        console.log('componentAfterViewChange', this.newAd);
    }

    routerOnActivate(curr: RouteSegment){
        console.log('routerOnActivate', arguments);
        if(this.newAd){
            this.newAd.insertAd.subscribe((ad)=>console.log('subscribe', ad));
        }
    }

    ngOnInit() {
        //this._router.navigate(['/ads']);
        this._authService.checkLogin().subscribe(
            item => { console.log('Login response:', item) },
            error =>  { console.error(error); }
        );
    }

    OnInsertAdd(ad) {
        console.log("OnInsertAdd", ad);
    }
}
