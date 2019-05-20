import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperComponent } from 'src/components/developer/developer.component';
import { SalariesListComponent } from 'src/components/developer/dashboard/salaries/salaries-list.component';
import { UserWithMetricsResolver } from 'src/resolvers/user';

const routes: Routes = [
  {
    path: '',
    component: DeveloperComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/developer-dashboard.module#DeveloperDashboardModule'
      },
      {
        path: 'salaries',
        component: SalariesListComponent,
        resolve: {user: UserWithMetricsResolver}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperRoutingModule {
}
