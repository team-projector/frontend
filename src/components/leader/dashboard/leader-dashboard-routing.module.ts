import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserWithMetricsResolver } from 'src/resolvers/user';
import { LeaderDashboardComponent } from 'src/components/leader/dashboard/leader-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderDashboardComponent,
    resolve: {user: UserWithMetricsResolver},
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderDashboardRoutingModule {
}
