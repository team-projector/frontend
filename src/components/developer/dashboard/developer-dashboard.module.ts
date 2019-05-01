import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeveloperDashboardRoutingModule} from './developer-dashboard-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {IssuesModule} from '../../issues/issues.module';
import {DeveloperDashboardComponent} from './developer-dashboard.component';
import {JunteUiModule} from 'junte-ui';
import {DatePipesModule} from '../../../pipes/date-pipes.module';
import {IssuesListComponent} from './issues/issues-list.component';
import {DueDateResolver} from '../../../resolvers/due-date';
import {UserWithMetricsResolver} from '../../../resolvers/user';
import {UsersServiceProvider} from '../../../services/users/provider';
import {ProblemsListComponent} from './problems/problems-list.component';
import {TimeExpensesListComponent} from './time-expenses/time-expenses-list.component';

@NgModule({
  declarations: [
    DeveloperDashboardComponent,
    IssuesListComponent,
    ProblemsListComponent,
    TimeExpensesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    DatePipesModule,
    DeveloperDashboardRoutingModule,
    IssuesModule
  ],
  providers: [
    UserWithMetricsResolver,
    DueDateResolver,
    UsersServiceProvider
  ]
})
export class DeveloperDashboardModule {
}
