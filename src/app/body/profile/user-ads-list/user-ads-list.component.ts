
import { Component, OnInit, Input } from '@angular/core';
import { IAd } from './../../ad-list/ad/ad.component';

@Component({
    moduleId: module.id,
    selector: 'user-ads-list',
    templateUrl: 'user-ads-list.component.html'
})
export class UserAdsList implements OnInit {
    @Input() ads: IAd[];

    constructor() {
    }

    ngOnInit() {
    }
}