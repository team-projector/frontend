import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserWithMetricsResolver } from 'src/resolvers/user';
import { LeaderDashboardComponent } from 'src/components/leader/dashboard/leader-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderDashboardComponent,
    data: { breadcrumb: 'Dashboard' },
    resolve: {user: UserWithMetricsResolver},
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'teams'
      },
      {
        path: 'teams',
        loadChildren: './teams/teams.module#TeamsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderDashboardRoutingModule {
}
