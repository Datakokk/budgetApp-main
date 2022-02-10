import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() dataRoutes: any;  
  dataBreadcrumbs: any = [];

  constructor() { }

  ngOnInit(): void {
    this.dataRoutes.forEach(elem => {
      if(elem.snapshot.routeConfig?.path !== '') {
        this.dataBreadcrumbs.push({
          title: elem.snapshot.data.title,
          absolutePath: elem.snapshot.data.absolutePath
        })
      }
    });
  }

}
