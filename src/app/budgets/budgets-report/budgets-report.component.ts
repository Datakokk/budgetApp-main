import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Budget } from 'src/app/models/budget.model';
import { BudgetsService } from 'src/app/services/budgets.service';
import { ToastMessagesService } from 'src/app/services/toast-messages.service';

@Component({
  selector: 'app-budgets-report',
  templateUrl: './budgets-report.component.html',
  styleUrls: ['./budgets-report.component.scss']
})
export class BudgetsReportComponent implements OnInit {

  dataRoutes: any;
  budgets: Array<Budget>;
  budgetInEdit: Budget;
  @ViewChild('overlay') overlayRef: ElementRef;

  constructor(private route: ActivatedRoute,
              private toastMessagesService: ToastMessagesService,
              private budgetsService: BudgetsService) { }

  ngOnInit(): void {
      this.dataRoutes = this.route.pathFromRoot;
      this.loadBudgets();
  }

  loadBudgets() {
      this.budgetsService.getBudgets()
                         .subscribe((res: any) => {
                             this.budgets = res.budgets;
                             this.setTotal();
                         }, (err: any) => {
                            this.toastMessagesService.setToastMessage('warning', 'El servidor no se encuentra disponible en estos momentos')
                         })
  }

    setTotal() {
        this.budgets.forEach((elem: any) => {
            let total = 0;
            elem.items.forEach(elem => {
                total += elem.amount;
            });
            elem.total = total;
        })
    }

    editBudget(_id: string) {
        this.budgetsService.getBudget(_id)
                           .subscribe((res: any) => {
                               this.budgetInEdit = res.budget;
                               this.overlayRef.nativeElement.style.display = 'block';
                           }, (err: any) => {
                                this.toastMessagesService.setToastMessage('warning', 'El servidor no se encuentra disponible en estos momentos')
                           })
    }

    closeModal() {
        this.overlayRef.nativeElement.style.display = 'none';
    }

    submitBudget(event: Budget) {
        this.budgetsService.putBudget(this.budgetInEdit._id, event)
                           .subscribe((res: any) => {
                               this.loadBudgets();
                               this.closeModal();
                               this.toastMessagesService.setToastMessage('success', res.message);
                           }, (err: any) => {
                                this.toastMessagesService.setToastMessage('warning', 'El servidor no se encuentra disponible en estos momentos')
                           })
    }

}
