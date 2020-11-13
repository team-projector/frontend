import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamResolver } from 'src/resolvers/team';
import { TeamDashboardComponent } from './team-dashboard.component';

export const DASHBOARD = $localize`:@@label.dashboard:Dashboard`;

const routes: Routes = [
  {
    path: '',
    component: TeamDashboardComponent,
    data: {breadcrumb: DASHBOARD},
    resolve: {
      team: TeamResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamDashboardRoutingModule {

}
