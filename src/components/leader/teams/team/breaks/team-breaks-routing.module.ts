import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamBreaksComponent } from 'src/components/leader/teams/team/breaks/team-breaks.component';
import { TeamResolver } from 'src/resolvers/team';
import { UserResolver } from 'src/resolvers/user';
import { TeamBreaksListComponent } from './breaks/breaks-list.component';

const routes: Routes = [
  {
    path: '',
    component: TeamBreaksComponent,
    resolve: {
      team: TeamResolver,
      user: UserResolver
    },
    children: [
      {
        path: '',
        data: {breadcrumb: $localize`:@@label.work_breaks:Work Breaks`},
        component: TeamBreaksListComponent
      },
      // {
      //   path: 'gantt',
      //
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamBreaksRoutingModule {
}
