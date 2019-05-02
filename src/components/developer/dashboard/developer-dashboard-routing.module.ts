import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeveloperDashboardComponent} from './developer-dashboard.component';
import {IssuesListComponent} from './issues/issues-list.component';
import {DueDateResolver} from '../../../resolvers/due-date';
import {UserWithMetricsResolver} from '../../../resolvers/user';
import {ProblemsListComponent} from './problems/problems-list.component';
import {TimeExpensesListComponent} from './time-expenses/time-expenses-list.component';

const routes: Routes = [
  {
    path: '',
    component: DeveloperDashboardComponent,
    resolve: {user: UserWithMetricsResolver, dueDate: DueDateResolver},
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'issues'
      },
      {
        path: 'issues',
        component: IssuesListComponent,
        resolve: {user: UserWithMetricsResolver, dueDate: DueDateResolver}
      },
      {
        path: 'problems',
        component: ProblemsListComponent,
        resolve: {user: UserWithMetricsResolver}
      },
      {
        path: 'time-expenses',
        component: TimeExpensesListComponent,
        resolve: {user: UserWithMetricsResolver, dueDate: DueDateResolver}
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
