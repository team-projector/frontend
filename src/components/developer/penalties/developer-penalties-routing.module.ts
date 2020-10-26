import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeUserResolver } from 'src/resolvers/me';
import { DeveloperPenaltiesComponent } from './developer-penalties.component';

export const BONUSES_BREADCRUMB = $localize`:@@label.penalties:Penalties`;

const routes: Routes = [
  {
    path: '',
    component: DeveloperPenaltiesComponent,
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
export class DeveloperPenaltiesRoutingModule {

}
