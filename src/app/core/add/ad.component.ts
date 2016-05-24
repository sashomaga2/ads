import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

export interface IAd {
    id: number;
    caption: string;
    text: string;
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
    caption: string;
    text: string;

    @Input() data: IAd;
    @Output() clicked: EventEmitter<IAd> =
        new EventEmitter<IAd>();

    constructor() {
    }

    ngOnInit() {
        this.id = this.data.id;
        this.caption = this.data.caption;
        this.text = this.data.text;
    }

    onClick() : void {
        this.clicked.emit(this.data);
    }
}
