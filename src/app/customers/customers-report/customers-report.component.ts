import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomersService } from 'src/app/services/customers.service';
import { ToastMessagesService } from 'src/app/services/toast-messages.service';

@Component({
  selector: 'app-customers-report',
  templateUrl: './customers-report.component.html',
  styleUrls: ['./customers-report.component.scss']
})
export class CustomersReportComponent implements OnInit {

  dataRoutes: any;
  skip: number;
  limit: number;
  totalCustomers: number;
  customers: Array<Customer>;

  constructor(private route: ActivatedRoute,
              private toastMessagesService: ToastMessagesService,
              private customersService: CustomersService) { }

  ngOnInit(): void {
    this.dataRoutes = this.route.pathFromRoot;
    this.customersService.getPagesState()
                         .subscribe(data => {
                             this.skip = data.skip,
                             this.limit = data.limit
                         })
    this.loadCustomers();
  }

  loadCustomers(): void {
      this.customersService.getCustomers(this.skip, this.limit)
                           .subscribe((res: any) => {
                               this.totalCustomers = res.totalCustomers;
                               this.customers = res.customers;
                           }, (err: any) => {
                               if (err.error?.message) {
                                   this.toastMessagesService.setToastMessage('danger', err.error.message);
                               } else {
                                   this.toastMessagesService.setToastMessage('warning', 'El servidor no se encuentra disponible en estos momentos')
                               }
                           })
  }

  changePage(e) {
      this.skip = this.skip + this.limit * e;
      this.customersService.setPagesState(this.skip, this.limit);
      this.loadCustomers();
  }

}
