import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private customersEndpoint = environment.URLAPIserver + 'customers/';

  private pagesState: any = {
      skip: 0,
      limit: 5
  }

  private pagesStateSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.pagesState);

  getPagesState(): Observable<any> {
      return this.pagesStateSubject.asObservable();
  }

  setPagesState(skip: number, limit: number): void {
      this.pagesState = {skip, limit};
      this.pagesStateSubject.next(this.pagesState);
  }

  constructor(private http: HttpClient) { }

  getCustomers(skip: number, limit: number) {
      return this.http.get(this.customersEndpoint + skip + '/' + limit)
                      .pipe(
                        map((res: any) => {
                            return res;
                        })
                       )
  }

  getCustomer(_id: string) {
      return this.http.get(this.customersEndpoint + _id)
                      .pipe(
                        map((res: any) => {
                            return res;
                        })
                       )
  }

  findCustomer(term: string) {
      return this.http.get(this.customersEndpoint + 'search/' + term)
                      .pipe(
                        map((res: any) => {
                            return res;
                        })
                       )
  }

  postCustomer(customer: Customer) {
    return this.http.post(this.customersEndpoint, customer)
                    .pipe(
                      map((res: any) => {
                        return res;
                      })
                    )
  }

  putCustomer(_id: string, customer: Customer) {
    return this.http.put(this.customersEndpoint + _id, customer)
                    .pipe(
                      map((res: any) => {
                        return res;
                      })
                    )
  }

}
