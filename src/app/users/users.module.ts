import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersReportComponent } from './users-report/users-report.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UsersReportComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
