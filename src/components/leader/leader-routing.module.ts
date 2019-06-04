import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderComponent } from 'src/components/leader/leader.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'teams'
      },
      {
        path: 'teams',
        loadChildren: './teams/teams.module#TeamsModule'
      },
      {
        path: 'users/:user',
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
