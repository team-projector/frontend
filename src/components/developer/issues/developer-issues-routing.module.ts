import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperIssuesComponent } from './developer-issues.component';
import { IssuesListComponent } from './issues-list/issues-list.component';
import { DueDateResolver, IssuesTypeResolver } from '../../../resolvers/issue';
import { TimeExpensesListComponent } from './time-expenses-list/time-expenses-list.component';
import { MeUserResolver } from 'src/resolvers/me';
import { ProjectResolver } from 'src/resolvers/project';
import { MergeRequestStateResolver } from 'src/resolvers/merge-request';
import { DeveloperMergeRequestsListComponent } from 'src/components/developer/issues/merge-requests-list/merge-requests-list.component';

const routes: Routes = [
  {
    path: '',
    component: DeveloperIssuesComponent,
    resolve: {
      user: MeUserResolver,
      dueDate: DueDateResolver,
      project: ProjectResolver
    },
    children: [
      {
        path: '',
        data: {breadcrumb: 'Issues'},
        component: IssuesListComponent,
        resolve: {
          type: IssuesTypeResolver
        }
      },
      {
        path: 'time-expenses',
        data: {breadcrumb: 'Time Expenses'},
        component: TimeExpensesListComponent,
      },
      {
        path: 'merge-requests',
        data: {breadcrumb: 'Merge Requests'},
        resolve: {
          state: MergeRequestStateResolver
        },
        component: DeveloperMergeRequestsListComponent
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
