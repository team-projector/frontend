import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeveloperDashboardComponent} from './developer-dashboard.component';
import {IssuesListComponent} from './issues/issues-list.component';
import {DueDateResolver, OpenedResolver, ProblemsResolver} from '../../../resolvers/issue';
import {UserOrMeResolver} from '../../../resolvers/user';
import {TimeExpensesListComponent} from './time-expenses/time-expenses-list.component';

export function getUserName(data: any) {
  return data.user.name;
}

const routes: Routes = [
  {
    path: '',
    component: DeveloperDashboardComponent,
    data: {breadcrumb: getUserName},
    resolve: {user: UserOrMeResolver, dueDate: DueDateResolver},
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'issues'
      },
      {
        path: 'issues',
        data: {breadcrumb: 'Issues'},
        component: IssuesListComponent,
        resolve: {
          opened: OpenedResolver,
          problems: ProblemsResolver
        }
      },
      {
        path: 'time-expenses',
        data: {breadcrumb: 'Time Expenses'},
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
