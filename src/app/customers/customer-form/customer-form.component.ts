import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { ValidateCif } from '../cif.validator';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

    form: FormGroup;
    @Input() customer: Customer;
    @Output() customerEmitter: EventEmitter<Customer> = new EventEmitter();
    showValidation: boolean = false;
    
    constructor() { }

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required]),
            cif: new FormControl('', [ValidateCif]),
            adress: new FormControl('', [Validators.required]),
            cp: new FormControl(''),
            city: new FormControl('', [Validators.required]),
            contact: new FormGroup({
                name: new FormControl('', [Validators.required]),
                surname: new FormControl('', [Validators.required]),
                phone: new FormControl(''),
                email: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])
            })
        })
        this.form.patchValue(this.customer);
    }

    setValidation() {
        this.showValidation = true;
    }

    submitCustomer() {
        this.customerEmitter.emit(this.form.value);
    }

}
