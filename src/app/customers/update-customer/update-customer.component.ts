import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomersService } from 'src/app/services/customers.service';
import { ToastMessagesService } from 'src/app/services/toast-messages.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {

  dataRoutes: any;
  _id: string;
  customer: Customer;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastMessagesService: ToastMessagesService,
              private customersService: CustomersService) { }

  ngOnInit(): void {
    this.dataRoutes = this.route.pathFromRoot;
    this._id = this.route.snapshot.params._id;
    this.customersService.getCustomer(this._id)
                         .subscribe((res: any) => {
                            this.customer = res.customer;
                         }, (err: any) => {
                            if (err.error?.message) {
                                this.toastMessagesService.setToastMessage('danger', err.error.message);
                            } else {
                                this.toastMessagesService.setToastMessage('warning', 'El servidor no se encuentra disponible en estos momentos')
                            }
                         })
  }

  submitCustomer(event: Customer) {
      this.customersService.putCustomer(this._id, event)
                           .subscribe((res: any) => {
                               this.toastMessagesService.setToastMessage('success', res.message);
                               this.router.navigate(['/customers']);
                           }, (err: any) => {
                               if (err.error?.message) {
                                   this.toastMessagesService.setToastMessage('danger', err.error.message);
                               } else {
                                   this.toastMessagesService.setToastMessage('warning', 'El servidor no se encuentra disponible en estos momentos')
                               }
                           })
  }

}
