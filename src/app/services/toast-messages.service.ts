import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastMessagesService {

    private toastMessageSubject: Subject<any> = new Subject<any>();

    getToastMessage(): Observable<any> {
        return this.toastMessageSubject.asObservable();
    }

    setToastMessage(category: string, text: string): void {
        this.toastMessageSubject.next({
            category,
            text
        })
    }

    constructor() { }
}
