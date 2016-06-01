import { Component, OnInit } from '@angular/core';
import { OnActivate,RouteSegment } from '@angular/router';
import { IAd } from './../ad-list/ad/ad.component';
import { DataService } from './../../shared/services/data.service';
import { NavService } from './../../shared/services/nav.service';

@Component({
  moduleId: module.id,
  selector: 'app-ad-detail',
  templateUrl: 'ad-detail.component.html',
  styleUrls: ['ad-detail.component.css']
})
export class AdDetailComponent implements OnInit, OnActivate {

    ad: IAd = { title: '', text: '', _id: '', price: NaN };

    constructor(private _dataService: DataService,
                private _navService: NavService) {

    }

    ngOnInit() {
    }

    routerOnActivate(rs: RouteSegment) {
        this._dataService.getAd(rs.getParam('id'))
                    .subscribe((ad: IAd) => this.ad = ad);
        this._navService.changeRoute(1);
        ///
    }
}
