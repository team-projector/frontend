import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from 'src/components/leader/teams/teams.component';
import { OutletComponent } from 'src/components/outlet/outlet.component';

export const TEAMS_BREADCRUMB = $localize`:@@label.teams:Teams`;

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
        loadChildren: () => import('./team/team.module').then(m => m.TeamModule)
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
