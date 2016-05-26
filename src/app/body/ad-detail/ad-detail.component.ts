import { Component, OnInit } from '@angular/core';
import { OnActivate,RouteSegment } from '@angular/router';
import { IAd } from './../ad-list/ad/ad.component';
import { DataService } from './../../shared/services/data.service';

@Component({
  moduleId: module.id,
  selector: 'app-ad-detail',
  templateUrl: 'ad-detail.component.html',
  styleUrls: ['ad-detail.component.css']
})
export class AdDetailComponent implements OnInit, OnActivate {

    ad: IAd = { title: '', text: '', id: NaN };

    constructor(private _dataService: DataService) {

    }

    ngOnInit() {
    }

    routerOnActivate(rs: RouteSegment) {
        this._dataService.getAd(+rs.getParam('id'))
                    .subscribe((ad: IAd) => this.ad = ad);
    }
}
