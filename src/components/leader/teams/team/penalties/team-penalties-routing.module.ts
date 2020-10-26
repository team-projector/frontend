import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamResolver } from '../../../../../resolvers/team';
import { TeamPenaltiesComponent } from './team-penalties.component';

export const BONUSES_BREADCRUMB = $localize`:@@label.penalties:Penalties`;

const routes: Routes = [
  {
    path: '',
    component: TeamPenaltiesComponent,
    data: {breadcrumb: BONUSES_BREADCRUMB},
    resolve: {
      team: TeamResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamPenaltiesRoutingModule {

}
