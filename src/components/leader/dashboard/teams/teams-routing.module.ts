import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from 'src/components/leader/dashboard/team/team.component';
import { TeamsComponent } from 'src/components/leader/dashboard/teams/teams.component';
import { TeamMembersResolver } from 'src/resolvers/team-members';
import { TeamProblemsListComponent } from 'src/components/leader/dashboard/team/issues/problems-list/problems-list.component';
import { TeamResolver } from 'src/resolvers/team';
import { TeamIssuesListComponent } from 'src/components/leader/dashboard/team/issues/issues-list/issues-list.component';
import { OutletComponent } from 'src/components/outlet/outlet.component';
import { UserWithMetricsResolver } from 'src/resolvers/user';

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
        component: TeamsComponent,
      },
      {
        path: ':team',
        component: TeamComponent,
        data: {breadcrumb: getTeam},
        resolve: {members: TeamMembersResolver, team: TeamResolver},
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
            resolve: {team: TeamResolver, user: UserWithMetricsResolver}
          },
          {
            path: 'problems',
            data: {breadcrumb: 'Problems'},
            component: TeamProblemsListComponent,
            resolve: {team: TeamResolver}
          },
          {
            path: 'members/:user',
            loadChildren: '../../../developer/dashboard/developer-dashboard.module#DeveloperDashboardModule'
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
