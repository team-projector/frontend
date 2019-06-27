import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManagerComponent} from './manager.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    data: {breadcrumb: 'Manager'},
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/manager-dashboard.module#ManagerDashboardModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule {
}
