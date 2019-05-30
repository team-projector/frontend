import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from 'junte-ui';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { DueDateResolver } from 'src/resolvers/due-date';
import { UserWithMetricsResolver } from 'src/resolvers/user';
import { UsersServiceProvider } from 'src/services/users/provider';
import { LeaderDashboardComponent } from 'src/components/leader/dashboard/leader-dashboard.component';
import { LeaderDashboardRoutingModule } from 'src/components/leader/dashboard/leader-dashboard-routing.module';
import { TeamsServiceProvider } from 'src/services/teams/provider';
import { MetricsServiceProvider } from 'src/services/metrics/provider';

@NgModule({
  declarations: [
    LeaderDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    DatePipesModule,
    LeaderDashboardRoutingModule
  ],
  providers: [
    UserWithMetricsResolver,
    DueDateResolver,
    UsersServiceProvider,
    TeamsServiceProvider,
    MetricsServiceProvider
  ]
})
export class LeaderDashboardModule {
}
