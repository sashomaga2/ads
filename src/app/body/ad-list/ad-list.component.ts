import { Component, OnInit } from '@angular/core';
import { IAd, AdComponent } from './ad/ad.component';
import { DataService } from '../../shared/services/data.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'app-list',
    templateUrl: 'ad-list.component.html',
    styleUrls: ['ad-list.component.css'],
    directives: [AdComponent]
})
export class AdListComponent implements OnInit {
    errorMessage: string;
    ads: IAd[];
    constructor(private _dataService: DataService,
                private _authService: AuthService) {
    }

    ngOnInit() {
        this._authService.checkLogin().subscribe(
            item => { console.log('Login success!!!', item) },
            error =>  { console.error(error); });

        this._dataService.getAds()
            .subscribe(
            ads => this.ads = ads,
            error =>  this.errorMessage = <any>error);
    }

}
