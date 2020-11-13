import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeUserResolver } from 'src/resolvers/me';
import { LayoutComponent } from './layout.component';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
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
      },
      {
        path: 'shareholder',
        loadChildren: () => import('../shareholder/shareholder.module').then(m => m.ShareholderModule),
      },
      {
        path: 'tickets',
        loadChildren: () => import('../tickets/tickets.module').then(m => m.TicketsModule),
      },
      {
        path: '**',
        redirectTo: 'developer'
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
