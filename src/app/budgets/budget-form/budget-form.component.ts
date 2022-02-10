import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Budget } from 'src/app/models/budget.model';
import { Customer } from 'src/app/models/customer.model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss']
})
export class BudgetFormComponent implements OnInit {

    @Input() budget: Budget;
    @Output() budgetEmitter: EventEmitter<any> = new EventEmitter;
    @Output() cancelEmitter: EventEmitter<any> = new EventEmitter;
    form: FormGroup;
    customers: Array<Customer>;
    customer: Customer;
    @ViewChildren('searchItem') searchItemsRef: QueryList<any>;
    selectedItemIndex: number = -1;
    inEdition: boolean = false;

    constructor(private fb: FormBuilder,
                private cd: ChangeDetectorRef,
                private customersService: CustomersService,
                private authService: AuthService) { }


    ngOnChanges() {
        if(this.form !== undefined) {
            this.loadBudgetInEdit();
        }
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: '',
            cif: '',
            contactName: '',
            contactSurname: '',
            contactPhone: '',
            contactEmail: '',
            date: (new Date()).toISOString().substring(0,10),
            validUntil: (new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)).toISOString().substring(0, 10),
            items: new FormArray([]),
            total: 0
        })
        if(this.budget !== undefined) {
            this.loadBudgetInEdit();
        } else {
            this.addFormItem();
        }
        this.searchCustomer();
        this.changeFormItems();
    }

    update() {
        this.cd.detectChanges();
    }

    newFormItem(): FormGroup {
        return this.fb.group({
            article: '',
            quantity: null,
            price: null,
            amount: null
        })
    }

    get items(): FormArray {
        return this.form.get('items') as FormArray; 
    }

    addFormItem() {
        this.items.push(this.newFormItem())
    }

    removeFormItem(i: number) {
        this.items.removeAt(i);
    }

    searchCustomer() {
        this.form.get('name').valueChanges
                             .subscribe(data => {
                                 this.selectedItemIndex = -1;
                                 if (data !== '') {
                                    this.customersService.findCustomer(data)
                                                        .subscribe((res: any) => {
                                                            this.customers = res.customers;
                                                        }, (err: any) => {
                                                            console.log(err);
                                                        })
                                 } else {
                                    this.customers = [];
                                 }
                             })
    }

    selectCustomer() {
        this.setCustomer(this.customers[this.selectedItemIndex])
    }

    setCustomer(customer: Customer) {
        this.customer = customer;
        this.customers = [];
        this.form.get('name').patchValue(this.customer.name, {emitEvent: false})
        this.form.get('cif').patchValue(this.customer.cif, {emitEvent: false})
        this.form.get('contactName').patchValue(this.customer.contact.name, {emitEvent: false})
        this.form.get('contactSurname').patchValue(this.customer.contact.surname, {emitEvent: false})
        this.form.get('contactPhone').patchValue(this.customer.contact.phone, {emitEvent: false})
        this.form.get('contactEmail').patchValue(this.customer.contact.email, {emitEvent: false})
    }

    focusDown() {
        if(this.selectedItemIndex < this.searchItemsRef.length - 1) {
            this.selectedItemIndex++;
            this.searchItemsRef.forEach((elem, i) => {
                if(this.selectedItemIndex === i) {
                    elem.nativeElement.classList.add('selected');
                } else {
                    elem.nativeElement.classList.remove('selected');
                }
            })
        }
    }

    focusUp() {
        if(this.selectedItemIndex > 0) {
            this.selectedItemIndex--;
            this.searchItemsRef.forEach((elem, i) => {
                if(this.selectedItemIndex === i) {
                    elem.nativeElement.classList.add('selected');
                } else {
                    elem.nativeElement.classList.remove('selected');
                }
            })
        }
    }

    changeFormItems() {
        this.items.valueChanges
                  .subscribe(dataItems => {
                      dataItems.forEach((elem: any, i: number) => {
                          this.items.at(i).get('amount').patchValue(this.setItemAmount(elem.quantity, elem.price), {emitEvent: false})
                      });
                      this.setTotal();
                  })
    }

    setItemAmount(quantity: number, price: number): number {
        return Math.round(quantity * price * 100) / 100;
    }

    setTotal() {
        let total = 0;
        this.items.controls.forEach((elem: any) => {
            total += elem.controls.amount.value;
        })
        this.form.get('total').patchValue(total);
    }

    submitBudget() {
        let userId;
        this.authService.getUserState()
                        .subscribe(data => {
            userId = data._id
        })
        const budget: Budget = {
            customer: this.customer,
            date: new Date(this.form.get('date').value),
            validUntil: new Date(this.form.get('validUntil').value),
            items: this.form.get('items').value,
            idSalesUser: userId
        }
        this.budgetEmitter.emit(budget);
    }

    loadBudgetInEdit() {
        this.items.clear();
        this.setCustomer(this.budget?.customer);
        this.form.get('date').patchValue(this.budget?.date.substring(0,10));
        this.form.get('validUntil').patchValue(this.budget?.validUntil.substring(0,10));
        this.budget?.items.forEach(elem => {
            this.items?.push(this.fb.group({
                article: elem.article,
                quantity: elem.quantity,
                price: elem.price,
                amount: elem.amount
            }))
        })
        this.setTotal();
    }

    cancel() {
        this.cancelEmitter.emit()
    }

}
