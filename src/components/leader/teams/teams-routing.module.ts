import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from 'src/components/leader/teams/team/team.component';
import { TeamsComponent } from 'src/components/leader/teams/teams.component';
import { TeamProblemsListComponent } from 'src/components/leader/teams/team/issues/problems-list/problems-list.component';
import { TeamResolver } from 'src/resolvers/team';
import { TeamIssuesListComponent } from 'src/components/leader/teams/team/issues/issues-list/issues-list.component';
import { OutletComponent } from 'src/components/outlet/outlet.component';
import { UserResolver } from 'src/resolvers/user';
import { DueDateResolver } from 'src/resolvers/due-date';

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
        resolve: {team: TeamResolver, user: UserResolver, dueDate: DueDateResolver},
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
          },
          {
            path: 'problems',
            data: {breadcrumb: 'Problems'},
            component: TeamProblemsListComponent
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
