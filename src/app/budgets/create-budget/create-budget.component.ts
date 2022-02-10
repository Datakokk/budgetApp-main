import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget } from 'src/app/models/budget.model';
import { BudgetsService } from 'src/app/services/budgets.service';
import { ToastMessagesService } from 'src/app/services/toast-messages.service';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.scss']
})
export class CreateBudgetComponent implements OnInit {

  dataRoutes: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastMessagesService: ToastMessagesService,
              private budgetsService: BudgetsService) { }

  ngOnInit(): void {
      this.dataRoutes = this.route.pathFromRoot;
  }

  submitBudget(event: Budget) {
      this.budgetsService.postBudget(event)
                         .subscribe((res: any) => {
                             this.router.navigate(['/budgets']);
                             this.toastMessagesService.setToastMessage('success', res.message);
                         }, (err: any) => {
                            this.toastMessagesService.setToastMessage('warning', 'El servidor no se encuentra disponible en estos momentos')
                         })
  }

}
