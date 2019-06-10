import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperDashboardComponent } from './developer-dashboard.component';
import { IssuesListComponent } from './issues/issues-list.component';
import { DueDateResolver } from '../../../resolvers/due-date';
import { UserWithMetricsResolver } from '../../../resolvers/user';
import { ProblemsListComponent } from './problems/problems-list.component';
import { TimeExpensesListComponent } from './time-expenses/time-expenses-list.component';

export function getUserName(data: any) {
  return data.user.name;
}

const routes: Routes = [
  {
    path: '',
    component: DeveloperDashboardComponent,
    data: {breadcrumb: getUserName},
    resolve: {user: UserWithMetricsResolver, dueDate: DueDateResolver},
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'issues'
      },
      {
        path: 'issues',
        data: { breadcrumb: 'Issues' },
        component: IssuesListComponent,
      },
      {
        path: 'problems',
        data: { breadcrumb: 'Problems' },
        component: ProblemsListComponent,
      },
      {
        path: 'time-expenses',
        data: { breadcrumb: 'Time Expenses' },
        component: TimeExpensesListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperDashboardRoutingModule {
}
