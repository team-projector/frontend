import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeveloperDashboardRoutingModule } from './developer-dashboard-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DeveloperDashboardComponent } from './developer-dashboard.component';
import { JunteUiModule } from 'junte-ui';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { DueDateResolver } from 'src/resolvers/due-date';
import { UserWithMetricsResolver } from 'src/resolvers/user';
import { UsersServiceProvider } from 'src/services/users/provider';
import { IssuesListsModule } from 'src/components/developer/dashboard/issues-lists.module';

@NgModule({
  declarations: [
    DeveloperDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    DatePipesModule,
    DeveloperDashboardRoutingModule,
    IssuesListsModule
  ],
  providers: [
    UserWithMetricsResolver,
    DueDateResolver,
    UsersServiceProvider
  ]
})
export class DeveloperDashboardModule {
}
