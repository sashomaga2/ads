import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

export interface IAd {
    id: number;
    title: string;
    text: string;
    price: number;
}

@Component({
  moduleId: module.id,
  selector: 'app-ad',
  templateUrl: 'ad.component.html',
  styleUrls: ['ad.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class AdComponent implements IAd, OnInit {
    id: number;
    title: string;
    text: string;
    price: number;

    @Input() data: IAd;
    @Output() clicked: EventEmitter<IAd> =
        new EventEmitter<IAd>();

    constructor() {
    }

    ngOnInit() {
        this.id = this.data.id;
        this.title = this.data.title;
        this.text = this.data.text;
        this.price = this.data.price;
    }

    onClick() : void {
        this.clicked.emit(this.data);
    }
}
