import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamIssuesListComponent } from 'src/components/leader/teams/team/issues/issues/issues-list.component';
import { TeamTimeExpensesListComponent } from 'src/components/leader/teams/team/issues/time-expenses/time-expenses.component';
import { TeamComponent } from 'src/components/leader/teams/team/team.component';
import { TeamsComponent } from 'src/components/leader/teams/teams.component';
import { OutletComponent } from 'src/components/outlet/outlet.component';
import { DueDateResolver, IssuesTypeResolver } from 'src/resolvers/issue';
import { MergeRequestStateResolver } from 'src/resolvers/merge-request';
import { ProjectResolver } from 'src/resolvers/project';
import { TeamResolver } from 'src/resolvers/team';
import { UserResolver } from 'src/resolvers/user';
import { TeamMergeRequestsListComponent } from './team/issues/merge-requests/merge-requests.component';

export function getTeam(data: any) {
  return data.team.title;
}

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    data: {breadcrumb: 'Teams'},
    children: [
      {
        path: '',
        component: TeamsComponent
      },
      {
        path: ':team',
        component: TeamComponent,
        data: {breadcrumb: getTeam},
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {
}
