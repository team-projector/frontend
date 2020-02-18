import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamIssuesListComponent } from 'src/components/leader/teams/team/issues/issues/issues-list.component';
import { TeamMergeRequestsListComponent } from 'src/components/leader/teams/team/issues/merge-requests/merge-requests.component';
import { TeamIssuesComponent } from 'src/components/leader/teams/team/issues/team-issues.component';
import { TeamTimeExpensesListComponent } from 'src/components/leader/teams/team/issues/time-expenses/time-expenses.component';
import { DueDateResolver, IssuesTypeResolver } from 'src/resolvers/issue';
import { MergeRequestStateResolver } from 'src/resolvers/merge-request';
import { ProjectResolver } from 'src/resolvers/project';
import { TeamResolver } from 'src/resolvers/team';
import { UserResolver } from 'src/resolvers/user';

const ISSUES_BREADCRUMB = $localize`:@@label.issues:Issues`;
const TIME_EXPENSES_BREADCRUMB = $localize`:@@label.time_expenses:Time Expenses`;
const MERGE_REQUESTS_BREADCRUMB = $localize`:@@label.merge_requests:Merge Requests`;

const routes: Routes = [
  {
    path: '',
    component: TeamIssuesComponent,
    resolve: {
      team: TeamResolver,
      user: UserResolver,
      dueDate: DueDateResolver,
      project: ProjectResolver
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'issues'
      },
      {
        path: 'issues',
        data: {breadcrumb: ISSUES_BREADCRUMB},
        component: TeamIssuesListComponent,
        resolve: {
          type: IssuesTypeResolver
        }
      },
      {
        path: 'merge-requests',
        data: {breadcrumb: MERGE_REQUESTS_BREADCRUMB},
        component: TeamMergeRequestsListComponent,
        resolve: {
          state: MergeRequestStateResolver
        }
      },
      {
        path: 'time-expenses',
        data: {breadcrumb: TIME_EXPENSES_BREADCRUMB},
        component: TeamTimeExpensesListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamIssuesRoutingModule {
}
