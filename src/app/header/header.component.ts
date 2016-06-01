import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NavService } from './../shared/services/nav.service';

@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class HeaderComponent implements OnInit {

    isMain: boolean = true;
    btnWidth: number = 100;

    subscription: Subscription;

    constructor(private _navService: NavService) {

    }

    newAdClicked() :void {
        this.isMain = false;
    }

    backClicked() :void {
        this.isMain = true;
    }

    ngOnInit() {
        this.subscription = this._navService.selectedRoute$
            .subscribe(item => {
                console.log('SUBSCRIBE');
                this.isMain = false;
            })
    }
}
