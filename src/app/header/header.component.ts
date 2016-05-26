import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

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

    constructor() {}

    newAdClicked() :void {
        this.isMain = false;
    }

    backClicked() :void {
        this.isMain = true;
    }

    ngOnInit() {
    }
}
