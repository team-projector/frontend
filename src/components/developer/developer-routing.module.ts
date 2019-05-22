import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperComponent } from 'src/components/developer/developer.component';

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
        loadChildren: './salaries/salaries.module#SalariesModule'
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
