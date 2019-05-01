import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeamComponent} from './team/team.component';

const routes: Routes = [
  {
    path: '',
    component: TeamComponent,
    children: [
      {
        path: 'users/:user/dashboard',
        loadChildren: '../developer/dashboard/developer-dashboard.module#DeveloperDashboardModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderRoutingModule {
}
