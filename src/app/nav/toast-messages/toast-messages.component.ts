import { Component, OnInit } from '@angular/core';
import { ToastMessagesService } from 'src/app/services/toast-messages.service';

@Component({
  selector: 'app-toast-messages',
  templateUrl: './toast-messages.component.html',
  styleUrls: ['./toast-messages.component.scss']
})
export class ToastMessagesComponent implements OnInit {

    toastMessage: any;
    showToastMessage: boolean = false;

    constructor(private toastMessagesService: ToastMessagesService) { }

    ngOnInit(): void {
        this.toastMessagesService.getToastMessage()
                                 .subscribe(data => {
                                     this.showToastMessage = true;
                                     this.toastMessage = data;
                                     const timer = setTimeout(() => {
                                        this.showToastMessage = false;
                                        clearTimeout(timer);
                                     }, 4000)
                                 })
    }

}
