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
import { IssuesListsModule } from './issues-lists.module';
import { SalariesListComponent } from './salaries/salaries-list.component';
import { SalariesServiceProvider } from 'src/services/salaries/provider';
import { SalariesModule } from 'src/components/salaries/salaries.module';

@NgModule({
  declarations: [
    DeveloperDashboardComponent,
    SalariesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    DatePipesModule,
    DeveloperDashboardRoutingModule,
    IssuesListsModule,
    SalariesModule
  ],
  providers: [
    UserWithMetricsResolver,
    DueDateResolver,
    UsersServiceProvider,
    SalariesServiceProvider
  ]
})
export class DeveloperDashboardModule {
}
