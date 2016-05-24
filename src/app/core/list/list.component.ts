import { Component, OnInit } from '@angular/core';
import { IAd, AdComponent } from './../add/ad.component';

@Component({
    moduleId: module.id,
    selector: 'app-list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.css'],
    directives: [AdComponent]
})
export class ListComponent implements OnInit {

    ads: IAd[];
    constructor() {
        this.ads = [
            {
                id: 1,
                caption: 'Caption',
                text: 'Text1'
            },
            {
                id: 2,
                caption: 'Caption2',
                text: 'Text2'
            },
            {
                id: 3,
                caption: 'Caption3',
                text: 'Text3',
            },
        ];
        console.log("constructing list", this.ads);
    }

  ngOnInit() {

  }

}
