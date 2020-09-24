import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { format } from 'date-fns';
import { SalaryResolver } from 'src/resolvers/salary';
import { Salary } from '../../../models/salary';
import { SalaryBonusesListComponent } from './bonuses-list/bonuses-list.component';
import { SalaryPenaltiesListComponent } from './penalties-list/penalties-list.component';
import { SalaryDetailComponent } from './salary-detail.component';
import { SalaryTimeExpensesListComponent } from './time-expenses-list/time-expenses-list.component';

export function getSalary({salary}: { salary: Salary }) {
  return format(salary.createdAt, 'PPp');
}

export const TIME_EXPENSES_BREADCRUMB = $localize`:@@label.expenses:Time expenses`;
export const SALARY_BONUSES = $localize`:@@label.bonuses:Bonuses`;
export const SALARY_PENALTIES = $localize`:@@label.penalties:Penalties`;

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: getSalary},
    component: SalaryDetailComponent,
    resolve: {
      salary: SalaryResolver
    },
    children: [
      {
        path: '',
        data: {breadcrumb: TIME_EXPENSES_BREADCRUMB},
        component: SalaryTimeExpensesListComponent,
        resolve: {
          salary: SalaryResolver
        },
      },
      {
        path: 'bonuses',
        data: {breadcrumb: SALARY_BONUSES},
        component: SalaryBonusesListComponent,
        resolve: {
          salary: SalaryResolver
        }
      },
      {
        path: 'penalties',
        data: {breadcrumb: SALARY_PENALTIES},
        component: SalaryPenaltiesListComponent,
        resolve: {
          salary: SalaryResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryDetailRoutingModule {

}
