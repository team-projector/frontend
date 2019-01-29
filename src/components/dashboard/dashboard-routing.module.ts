import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
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
        redirectTo: 'me'
      },
      {
        path: 'me',
        loadChildren: '../me/me.module#MeModule',
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
