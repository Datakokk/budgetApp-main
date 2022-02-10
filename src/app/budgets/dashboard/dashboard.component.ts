import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Budget } from 'src/app/models/budget.model';
import { Dates } from 'src/app/models/dates.model';
import { BudgetsService } from 'src/app/services/budgets.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    dataRoutes: any;
    // budgets: Array<Budget>;

    // currentMonthTotal: number;
    // lastMonthTotal: number;
    // secondLastMonthTotal: number;

    // customersTotals: any;

    months: any = [];
    totalsMonth: any = [];

    customers: any = [];
    totalsCustomers: any = [];
    
    lineChart: any = [];
    pieChart: any = [];

    constructor(private route: ActivatedRoute,
            private budgetsService: BudgetsService) { }

    ngOnInit(): void {
        this.dataRoutes = this.route.pathFromRoot;
        // this.budgetsService.getBudgets()
        //                 .subscribe((res: any) => {
        //                     this.budgets = res.budgets;
        //                     this.setTotal();
        //                     this.currentMonthTotal = this.getTotalMonth(Dates.getDates().firstDayCurrentMonth, Dates.getDates().lastDayCurrentMonth);
        //                     this.lastMonthTotal = this.getTotalMonth(Dates.getDates().firstDayLastMonth, Dates.getDates().lastDayLastMonth);
        //                     this.secondLastMonthTotal = this.getTotalMonth(Dates.getDates().firstDaySecondLastMonth, Dates.getDates().lastDaySecondLastMonth);
        //                     this.getTopCustomers();
        //                     this.loadLineChart();
        //                     this.loadPieChart();
        //                 }, (err: any) => {
        //                     console.log(err);
        //                 })
        this.budgetsService.getAggMonths()
                            .subscribe((res: any) => {
                                res.aggMonths.forEach((elem: any) =>{
                                    this.months.push(Dates.monthNamesES[elem.month - 1] + ' ' + elem.year);
                                    this.totalsMonth.push(elem.totals);
                                })
                                this.loadLineChart();
                            }, (err: any) => {
                                console.log(err);
                            })                    
        this.budgetsService.getAggCustomers()
                           .subscribe((res: any) => {
                                res.aggCustomers.forEach((elem: any) => {
                                    this.customers.push(elem.customer);
                                    this.totalsCustomers.push(elem.totals);
                                })
                                this.loadPieChart();
                           }, (err: any) => {
                               console.log(err);
                           })
    }

    // setTotal() {
    //     this.budgets.forEach((elem: any) => {
    //         let total = 0;
    //         elem.items.forEach(elem => {
    //             total += elem.amount;
    //         });
    //         elem.total = total;
    //     })
    // }

    // getTotalMonth(firstDay: any, lastDay: any) {
    //     let totalMonth = 0;
    //     this.budgets.forEach((elem: any) => {
    //         if (new Date(elem.date).getTime() >= firstDay.getTime() &&
    //             new Date(elem.date).getTime() < (lastDay.getTime() + 24 * 60 * 60 * 1000)) {
    //             totalMonth += elem.total;
    //         }
    //     })
    //     return totalMonth;
    // }

    loadLineChart() {
        // const months = [
        //     Dates.getMonthNameES(Dates.getDates().firstDaySecondLastMonth), 
        //     Dates.getMonthNameES(Dates.getDates().firstDayLastMonth), 
        //     Dates.getMonthNameES(Dates.getDates().firstDayCurrentMonth), 
        // ];
        // const totals = [this.secondLastMonthTotal, this.lastMonthTotal, this.currentMonthTotal];
        this.lineChart = new Chart('budgetsChart', {
            type: 'line',
            data: {
                labels: this.months.reverse(),
                datasets: [
                    {
                        data: this.totalsMonth.reverse(),
                        borderColor: '#0a2558'
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                }
            }
        })
    }

    // getTopCustomers() {
    //     let customers: Array<string> = [];
    //     let totals: Array<number> = [];
    //     this.budgets.forEach((elem: any) => {
    //         if(!customers.includes(elem.customer.name)) {
    //             customers.push(elem.customer.name);
    //             totals.push(0);
    //         }
    //     })
    //     this.budgets.forEach((elem: any) => {
    //         const position = customers.indexOf(elem.customer.name);
    //         totals[position] += elem.total;
    //     })
    //     this.customersTotals = customers.map((elem: any, i: number) => {
    //         return {customer: elem, total: totals[i]};
    //     })
    //     this.customersTotals.sort((a, b) => {
    //         return a.total - b.total;
    //     })
    //     this.customersTotals = this.customersTotals.slice(-5);
    // }


    loadPieChart() {
        // let customers = [];
        // let totals = [];
        // this.customersTotals.forEach((elem: any) => {
        //     customers.push(elem.customer);
        //     totals.push(elem.total);
        // });
        this.pieChart = new Chart('customersChart', {
            type: 'pie',
            data: {
                labels: this.customers,
                datasets: [
                    {
                        backgroundColor: ['#3498db','#679436','#f1c40f','#e74c3c','#d696bb'],
                        data: this.totalsCustomers
                    }
                ]
            }
        })
    }

}
