import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAd } from './../ad-list/ad/ad.component';
import { UserAdsList } from './user-ads-list/user-ads-list.component';
import { AuthService } from './../../shared/services/auth.service';
import { DataService } from './../../shared/services/data.service';
import { NavService } from './../../shared/services/nav.service';
import { AppRoutes } from './../../ads-app.component';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html',
    directives: [UserAdsList]
})
export class ProfileComponent implements OnInit {

    ads: IAd[];
    private sub: any;

    constructor(private _dataService: DataService,
                private _navService: NavService,
                private _router: Router,
                private _authService: AuthService) {
    }

    ngOnInit() {
        this.sub = this._router
            .routerState
            .queryParams
            .subscribe(params => {
                 if(!this._authService.isLoggedIn()){
                    return this._router.navigate(['ads']);
                }

                this._navService.changedRoute(AppRoutes.Profile);
                this._dataService.getAds(this._authService.getLoggedUser()._id)
                        .subscribe(
                            ads => console.log('subscribe!!!'),
                            error =>  console.error(error));
            });
    }

    routerOnActivate() {
        if(!this._authService.isLoggedIn()){
            return this._router.navigate(['ads']);
        }

        this._navService.changedRoute(AppRoutes.Profile);
        this._dataService.getAds(this._authService.getLoggedUser()._id)
                .subscribe(
                    ads => console.log('subscribe!!!'),
                    error =>  console.error(error));
    }
}
