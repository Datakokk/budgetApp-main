import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetsReportComponent } from './budgets-report/budgets-report.component';
import { CreateBudgetComponent } from './create-budget/create-budget.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReadBudgetComponent } from './read-budget/read-budget.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'budgets-report',
        component: BudgetsReportComponent,
        data: {
            title: 'Presupuestos',
            absolutePath: '/budgets/budgets-report'
        }
    },
    {
        path: 'create-budget',
        component: CreateBudgetComponent,
        data: {
            title: 'Nuevo presupuesto',
            absolutePath: '/budgets/create-budget'
        }
    },
    {
        path: 'read-budget/:_id',
        component: ReadBudgetComponent,
        data: {
            title: 'Visualizar presupuesto',
            absolutePath: '/budgets/read-budget/:_id'
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetsRoutingModule { }
