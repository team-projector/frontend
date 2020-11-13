import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeUserResolver } from 'src/resolvers/me';
import { DeveloperDashboardComponent } from './developer-dashboard.component';

export const DASHBOARD = $localize`:@@label.dashboard:Dashboard`;

const routes: Routes = [
  {
    path: '',
    component: DeveloperDashboardComponent,
    data: {breadcrumb: DASHBOARD},
    resolve: {
      me: MeUserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperDashboardRoutingModule {

}
