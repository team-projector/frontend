import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './team/team.component';
import { TeamMembersResolver } from '../../resolvers/team-members';

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
