import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersReportComponent } from './users-report/users-report.component';

const routes: Routes = [
  {path: '', component: UsersReportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
