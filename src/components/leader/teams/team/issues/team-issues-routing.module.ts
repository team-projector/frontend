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
        data: {breadcrumb: 'Issues'},
        component: TeamIssuesListComponent,
        resolve: {
          type: IssuesTypeResolver
        }
      },
      {
        path: 'merge-requests',
        data: {breadcrumb: 'Merge Requests'},
        component: TeamMergeRequestsListComponent,
        resolve: {
          state: MergeRequestStateResolver
        }
      },
      {
        path: 'time-expenses',
        data: {breadcrumb: 'Time Expenses'},
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
