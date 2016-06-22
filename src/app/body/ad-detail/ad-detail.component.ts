import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IAd } from './../ad-list/ad/ad.component';
import { DataService } from './../../shared/services/data.service';
import { NavService } from './../../shared/services/nav.service';
import { AppRoutes } from './../../ads-app.component';

@Component({
  moduleId: module.id,
  selector: 'app-ad-detail',
  templateUrl: 'ad-detail.component.html',
  styleUrls: ['ad-detail.component.css']
})
export class AdDetailComponent implements OnInit {

    ad: IAd = { title: '', text: '', _id: '', price: NaN };
    private subscription: Subscription;

    constructor(private _dataService: DataService,
                private _navService: NavService,
                private _router: Router) {

    }

    ngOnInit() {
        this.subscription = this._router
            .routerState
            .queryParams
            .subscribe(params => {
                console.log('****params', params);
                // this.selectedId = +params['id'];
                // this.service.getHeroes()
                // .then(heroes => this.heroes = heroes);
                     this._dataService.getAd(params['id'])
                        .subscribe((ad: IAd) => this.ad = ad);
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
