import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  constructor() { }

  @Input() breadcrumb: object;
  @Input() title: boolean;
  @Input() action: boolean;

  ngOnInit() {
    // console.log(this.title,this.action)
    this.processBreadCrumbLinks();
  }
  private processBreadCrumbLinks() {
  }
}
