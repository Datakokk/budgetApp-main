import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Budget } from '../models/budget.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class BudgetsService {

    private budgetsEndpoint = environment.URLAPIserver + 'budgets/';

    constructor(private http: HttpClient) { }

    getBudgets() {
        return this.http.get(this.budgetsEndpoint)
                        .pipe(
                            map((res: any) => {
                                return res;
                            })
                        )
    }

    getBudget(_id: string) {
        return this.http.get(this.budgetsEndpoint + _id)
                        .pipe(
                            map((res: any) => {
                                return res;
                            })
                        )
    }

    getPDFBudget(_id: string) {
        return this.http.get(this.budgetsEndpoint + 'createpdf/' + _id)
                        .pipe(
                            map((res: any) => {
                                return res;
                            })
                        )
    }

    getSendBudgetEmail(_id: string) {
        return this.http.get(this.budgetsEndpoint + 'sendemail/' + _id)
                        .pipe(
                            map((res: any) => {
                                return res;
                            })
                        )
    }

    getAggCustomers() {
        return this.http.get(this.budgetsEndpoint + 'agg-customers')
                        .pipe(
                            map((res: any) => {
                                return res;
                            })
                        )    
    }

    getAggMonths() {
        return this.http.get(this.budgetsEndpoint + 'agg-months')
                        .pipe(
                            map((res: any) => {
                                return res;
                            })
                        )    
    }

    postBudget(budget: Budget) {
        return this.http.post(this.budgetsEndpoint, budget)
                        .pipe(
                            map((res: any) => {
                                return res;
                            })
                        )
    }

    putBudget(_id: string, budget: Budget) {
        return this.http.put(this.budgetsEndpoint + _id, budget)
                        .pipe(
                            map((res: any) => {
                                return res;
                            })
                        )
    }


}
