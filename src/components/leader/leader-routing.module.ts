import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeamsComponent} from './teams/teams.component';
import {TeamComponent} from './team/team.component';
import {TeamMembersResolver} from '../../resolvers/team-members';
import {DeveloperDashboardComponent} from '../developer/dashboard/developer-dashboard.component';
import {UserWithMetricsResolver} from '../../resolvers/user';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'teams'
  },
  {
    path: 'teams',
    component: TeamsComponent,
    children: [
      {
        path: ':team',
        component: TeamComponent,
        resolve: {members: TeamMembersResolver}
      },
      {
        path: 'members/:user',
        loadChildren: '../developer/dashboard/developer-dashboard.module#DeveloperDashboardModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderRoutingModule {
}
