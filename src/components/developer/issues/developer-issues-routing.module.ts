import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperIssuesListComponent } from 'src/components/developer/issues/issues-list/issues-list.component';
import { DeveloperMergeRequestsListComponent } from 'src/components/developer/issues/merge-requests-list/merge-requests-list.component';
import { DeveloperTimeExpensesListComponent } from 'src/components/developer/issues/time-expenses-list/time-expenses-list.component';
import { DueDateResolver, IssuesTypeResolver } from 'src/resolvers/issue';
import { MeUserResolver } from 'src/resolvers/me';
import { MergeRequestStateResolver } from 'src/resolvers/merge-request';
import { ProjectResolver } from 'src/resolvers/project';
import { DeveloperIssuesComponent } from './developer-issues.component';

export const ISSUES_BREADCRUMB = $localize`:@@label.issues:Issues`;
export const TIME_EXPENSES_BREADCRUMB = $localize`:@@label.time_expenses:Time Expenses`;
export const MERGE_REQUESTS_BREADCRUMB = $localize`:@@label.merge_requests:Merge Requests`;

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
        data: {breadcrumb: ISSUES_BREADCRUMB},
        component: DeveloperIssuesListComponent,
        resolve: {
          type: IssuesTypeResolver
        }
      },
      {
        path: 'time-expenses',
        data: {breadcrumb: TIME_EXPENSES_BREADCRUMB},
        component: DeveloperTimeExpensesListComponent,
        resolve: {
          state: MergeRequestStateResolver
        },
      },
      {
        path: 'merge-requests',
        data: {breadcrumb: MERGE_REQUESTS_BREADCRUMB},
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
