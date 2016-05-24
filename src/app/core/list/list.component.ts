import { Component, OnInit } from '@angular/core';
import { IAd, AdComponent } from './../add/ad.component';
import { DataService } from '../../shared/data.service';

@Component({
    moduleId: module.id,
    selector: 'app-list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.css'],
    directives: [AdComponent],
    providers: [DataService]
})
export class ListComponent implements OnInit {
    errorMessage: string;
    ads: IAd[];
    constructor(private _dataService: DataService) {
        //this.ads = [
        //    {
        //        id: 1,
        //        caption: 'Caption',
        //        text: 'Text1'
        //    },
        //    {
        //        id: 2,
        //        caption: 'Caption2',
        //        text: 'Text2'
        //    },
        //    {
        //        id: 3,
        //        caption: 'Caption3',
        //        text: 'Text3',
        //    },
        //];
    }

  ngOnInit() {
    this._dataService.getAds()
      .subscribe(
        ads => this.ads = ads,
        error =>  this.errorMessage = <any>error);
  }

}
