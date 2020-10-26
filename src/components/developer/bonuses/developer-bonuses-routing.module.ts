import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeUserResolver } from 'src/resolvers/me';
import { DeveloperBonusesComponent } from './developer-bonuses.component';

export const BONUSES_BREADCRUMB = $localize`:@@label.bonuses:Bonuses`;

const routes: Routes = [
  {
    path: '',
    component: DeveloperBonusesComponent,
    data: {breadcrumb: BONUSES_BREADCRUMB},
    resolve: {
      user: MeUserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperBonusesRoutingModule {

}
