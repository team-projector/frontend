import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeamComponent} from 'src/components/leader/teams/team/team.component';
import {TeamsComponent} from 'src/components/leader/teams/teams.component';
import {TeamTimeExpensesListComponent} from 'src/components/leader/teams/team/issues/time-expenses/time-expenses.component';
import {TeamResolver} from 'src/resolvers/team';
import {TeamIssuesListComponent} from 'src/components/leader/teams/team/issues/issues-list/issues-list.component';
import {OutletComponent} from 'src/components/outlet/outlet.component';
import {UserResolver} from 'src/resolvers/user';
import {DueDateResolver, IssuesTypeResolver} from 'src/resolvers/issue';
import {ProjectResolver} from '../../../resolvers/project';
import {TeamMergeRequestsListComponent} from './team/issues/merge-requests/merge-requests.component';
import {MergeRequestStateResolver} from '../../../resolvers/merge-request';

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
