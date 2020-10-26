import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamResolver } from '../../../../../resolvers/team';
import { TeamBonusesComponent } from './team-bonuses.component';

export const BONUSES_BREADCRUMB = $localize`:@@label.bonuses:Bonuses`;

const routes: Routes = [
  {
    path: '',
    component: TeamBonusesComponent,
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
export class TeamBonusesRoutingModule {

}
