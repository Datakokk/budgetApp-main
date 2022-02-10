import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomersReportComponent } from './customers-report/customers-report.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';

const routes: Routes = [
    { path: '', component: CustomersReportComponent },
    {
        path: 'create-customer',
        component: CreateCustomerComponent,
        data: {
            title: 'Nuevo cliente',
            absolutePath: '/customers/create-customer'
        }
    },
    {
        path: 'update-customer/:_id',
        component: UpdateCustomerComponent,
        data: {
            title: 'Modificar cliente',
            absolutePath: '/customers/update-customer'
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
