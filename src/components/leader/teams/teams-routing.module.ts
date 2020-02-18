import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from 'src/components/leader/teams/team/team.component';
import { TeamsComponent } from 'src/components/leader/teams/teams.component';
import { OutletComponent } from 'src/components/outlet/outlet.component';
import { ProjectResolver } from 'src/resolvers/project';
import { TeamResolver } from 'src/resolvers/team';
import { UserResolver } from 'src/resolvers/user';

export const TEAMS_BREADCRUMB = $localize`:@@label.teams:Teams`;
export const WORK_BREAKS_BREADCRUMB = $localize`:@@label.work_breaks:Work Breaks`;

export function getTeam(data: any) {
  return data.team.title;
}

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    data: {breadcrumb: TEAMS_BREADCRUMB},
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
            data: {breadcrumb: WORK_BREAKS_BREADCRUMB},
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
