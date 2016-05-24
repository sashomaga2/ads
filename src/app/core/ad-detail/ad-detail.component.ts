import { Component, OnInit } from '@angular/core';
import { OnActivate,RouteSegment } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-ad-detail',
  templateUrl: 'ad-detail.component.html',
  styleUrls: ['ad-detail.component.css']
})
export class AdDetailComponent implements OnInit, OnActivate {

  constructor() {}

  ngOnInit() {
  }

  routerOnActivate(rs: RouteSegment) {
    console.log('on activate', +rs.getParam('id'));
  }

}
