import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreaksListComponent } from 'src/components/breaks/breaks-list/breaks-list.component';
import { TeamBreaksComponent } from 'src/components/leader/teams/team/breaks/team-breaks.component';
import { MeUserResolver } from 'src/resolvers/me';

const routes: Routes = [
  {
    path: '',
    component: TeamBreaksComponent,
    children: [
      {
        path: '',
        data: {breadcrumb: 'Breaks'},
        component: BreaksListComponent,
        resolve: {
          user: MeUserResolver
        }
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
