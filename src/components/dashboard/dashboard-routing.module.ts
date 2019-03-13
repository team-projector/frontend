import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {AuthorizationGuard} from '../../guards/authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'developer'
      },
      {
        path: 'developer',
        loadChildren: '../developer/developer.module#DeveloperModule',
      },
      {
        path: 'leader',
        loadChildren: '../leader/leader.module#LeaderModule',
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}