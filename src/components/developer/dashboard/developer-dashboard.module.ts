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
import { IssuesModule } from 'src/components/issues/issues.module';
import { SalariesListComponent } from 'src/components/developer/dashboard/salaries/salaries-list.component';
import { SalariesModule } from 'src/components/salaries/salaries.module';
import { SalariesServiceProvider } from 'src/services/salaries/provider';
import { TimeExpensesListComponent } from 'src/components/developer/dashboard/time-expenses/time-expenses-list.component';
import { ProblemsListComponent } from 'src/components/developer/dashboard/problems/problems-list.component';
import { IssuesListComponent } from 'src/components/developer/dashboard/issues/issues-list.component';

@NgModule({
  declarations: [
    DeveloperDashboardComponent,
    IssuesListComponent,
    ProblemsListComponent,
    TimeExpensesListComponent,
    SalariesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    DatePipesModule,
    DeveloperDashboardRoutingModule,
    IssuesModule,
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
