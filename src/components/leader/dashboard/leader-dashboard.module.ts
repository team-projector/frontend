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
import { IssuesListsModule } from 'src/components/developer/dashboard/issues-lists.module';
import { TeamMembersPipe } from 'src/components/leader/pipes';
import { TeamsServiceProvider } from 'src/services/teams/provider';

@NgModule({
  declarations: [
    TeamMembersPipe,
    LeaderDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    DatePipesModule,
    LeaderDashboardRoutingModule,
    IssuesListsModule
  ],
  providers: [
    UserWithMetricsResolver,
    DueDateResolver,
    UsersServiceProvider,
    TeamsServiceProvider
  ]
})
export class LeaderDashboardModule {
}
