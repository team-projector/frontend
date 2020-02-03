import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from 'src/components/leader/teams/team/team.component';
import { TeamsComponent } from 'src/components/leader/teams/teams.component';
import { OutletComponent } from 'src/components/outlet/outlet.component';
import { ProjectResolver } from 'src/resolvers/project';
import { TeamResolver } from 'src/resolvers/team';
import { UserResolver } from 'src/resolvers/user';

export function getTeam(data: any) {
  return data.team.title;
}

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    data: {breadcrumb: $localize`:@@label.teams:Teams`},
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
            loadChildren: () => import('./team/issues/team-issues.module').then(m => m.TeamIssuesModule)
          },
          {
            path: 'breaks',
            data: {breadcrumb: 'Work breaks'},
            loadChildren: () => import('./team/breaks/team-breaks.module').then(m => m.TeamBreaksModule)
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
