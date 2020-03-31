import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TIME_EXPENSES_BREADCRUMB } from 'src/components/developer/issues/developer-issues-routing.module';
import { DeveloperTimeExpensesListComponent } from 'src/components/developer/issues/time-expenses-list/time-expenses-list.component';
import { MeUserResolver } from 'src/resolvers/me';
import { MergeRequestStateResolver } from 'src/resolvers/merge-request';
import { SalaryResolver } from 'src/resolvers/salary';
import { SalariesListComponent } from './salaries-list.component';
import { SalaryBonusesListComponent } from 'src/components/developer/salaries/salary-detail/bonuses-list/bonuses-list.component';
import { SalaryPenaltiesListComponent } from 'src/components/developer/salaries/salary-detail/penalties-list/penalties-list.component';
import { SalaryDetailComponent } from './salary-detail/salary-detail.component';

export const SALARY_BREADCRUMB = $localize`:@@label.salary:Salary Detail`;
export const SALARY_BONUSES = $localize`:@@label.bonuses:Bonuses`;
export const SALARY_PENALTIES = $localize`:@@label.penalties:Penalties`;

const routes: Routes = [
  {
    path: '',
    component: SalariesListComponent,
    resolve: {user: MeUserResolver},
  },
  {
    path: ':salary',
    data: {breadcrumb: SALARY_BREADCRUMB},
    component: SalaryDetailComponent,
    resolve: {salary: SalaryResolver},
    children: [
      {
        path: '',
        data: {breadcrumb: TIME_EXPENSES_BREADCRUMB},
        component: DeveloperTimeExpensesListComponent,
        resolve: {
          state: MergeRequestStateResolver
        },
      },
      {
        path: 'bonuses',
        data: {breadcrumb: SALARY_BONUSES},
        component: SalaryBonusesListComponent,
        resolve: {
          salary: SalaryResolver,
          user: MeUserResolver
        }
      },
      {
        path: 'penalties',
        data: {breadcrumb: SALARY_PENALTIES},
        component: SalaryPenaltiesListComponent,
        resolve: {
          salary: SalaryResolver,
          user: MeUserResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalariesRoutingModule {
}
