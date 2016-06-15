import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

export interface IAd {
    _id: string;
    userId?: string,
    title: string;
    text: string;
    price: number;
    //created: Date;
    //duration: 3 months 
}

@Component({
  moduleId: module.id,
  selector: 'app-ad',
  templateUrl: 'ad.component.html',
  styleUrls: ['ad.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class AdComponent implements IAd, OnInit {
    _id: string;
    title: string;
    text: string;
    price: number;

    @Input() data: IAd;
    @Output() clicked: EventEmitter<IAd> =
        new EventEmitter<IAd>();

    constructor() {
    }

    ngOnInit() {
        this._id = this.data._id;
        this.title = this.data.title;
        this.text = this.data.text;
        this.price = this.data.price;
    }

    onClick() : void {
        this.clicked.emit(this.data);
    }
}
