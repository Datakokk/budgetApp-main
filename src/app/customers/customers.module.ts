import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersReportComponent } from './customers-report/customers-report.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';


@NgModule({
  declarations: [
    CustomersReportComponent,
    CreateCustomerComponent,
    CustomerFormComponent,
    UpdateCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CustomersModule { }
