import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeUserResolver } from '../../resolvers/me';
import { DashboardComponent } from './dashboard.component';
import { AuthorizationGuard } from '../../guards/authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthorizationGuard],
    resolve: {
      me: MeUserResolver
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'developer'
      },
      {
        path: 'developer',
        loadChildren: () => import('../developer/developer.module').then(m => m.DeveloperModule),
      },
      {
        path: 'leader',
        loadChildren: () => import('../leader/leader.module').then(m => m.LeaderModule),
      },
      {
        path: 'manager',
        loadChildren: () => import('../manager/manager.module').then(m => m.ManagerModule),
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
