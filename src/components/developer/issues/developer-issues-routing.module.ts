import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeveloperIssuesComponent} from './developer-issues.component';
import {IssuesListComponent} from './issues-list/issues-list.component';
import {DueDateResolver, OpenedResolver, ProblemsResolver} from '../../../resolvers/issue';
import {TimeExpensesListComponent} from './time-expenses-list/time-expenses-list.component';
import {MeUserResolver} from '../../../resolvers/me';

const routes: Routes = [
  {
    path: '',
    component: DeveloperIssuesComponent,
    resolve: {user: MeUserResolver, dueDate: DueDateResolver},
    children: [
      {
        path: '',
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
export class DeveloperIssuesRoutingModule {
}
