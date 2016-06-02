import { Component, OnInit } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES } from '@angular/router';
import { NavService } from './../../shared/services/nav.service';
import { Routes } from './../../ads-app.component';

@Component({
    moduleId: module.id,
    selector: 'app-register',
    templateUrl: 'register.component.html',
    //styleUrls: ['login.component.css']
    directives: [ROUTER_DIRECTIVES]
})
export class RegisterComponent implements OnInit, OnActivate {

    constructor(private _navService: NavService) {
    }

    ngOnInit() {
    }

    routerOnActivate() {
        this._navService.changedRoute(Routes.Register);
    }
}
