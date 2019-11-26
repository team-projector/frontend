import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperIssuesListComponent } from 'src/components/developer/issues/issues-list/issues-list.component';
import { DeveloperMergeRequestsListComponent } from 'src/components/developer/issues/merge-requests-list/merge-requests-list.component';
import { DueDateResolver, IssuesTypeResolver } from 'src/resolvers/issue';
import { MeUserResolver } from 'src/resolvers/me';
import { MergeRequestStateResolver } from 'src/resolvers/merge-request';
import { ProjectResolver } from 'src/resolvers/project';
import { DeveloperIssuesComponent } from './developer-issues.component';
import { TimeExpensesListComponent } from './time-expenses-list/time-expenses-list.component';

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
        component: DeveloperIssuesListComponent,
        resolve: {
          type: IssuesTypeResolver
        }
      },
      {
        path: 'time-expenses',
        data: {breadcrumb: 'Time Expenses'},
        component: TimeExpensesListComponent,
        resolve: {
          state: MergeRequestStateResolver
        },
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
