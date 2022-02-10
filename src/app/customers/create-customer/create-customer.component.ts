import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomersService } from 'src/app/services/customers.service';
import { ToastMessagesService } from 'src/app/services/toast-messages.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  dataRoutes: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastMessagesService: ToastMessagesService,
              private customersService: CustomersService) { }

  ngOnInit(): void {
    this.dataRoutes = this.route.pathFromRoot;
  }

  submitCustomer(event: Customer) {
      this.customersService.postCustomer(event)
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
