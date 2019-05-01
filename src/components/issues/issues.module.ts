import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MetricsServiceProvider} from '../../services/metrics/provider';
import {IssuesServiceProvider} from '../../services/issues/provider';
import {DeveloperDashboardComponent} from '../developer/dashboard/developer-dashboard.component';
import {DatePipesModule} from '../../pipes/date-pipes.module';
import {ArrayPipesModule} from '../../pipes/array-pipes.module';
import {TimeExpensesServiceProvider} from '../../services/time-expenses/provider';
import {IssuesComponent} from './issues/issues.component';
import {TimeExpensesComponent} from './time-expenses/time-expenses.component';
import {IssueProblemsComponent} from './problems/issue-problems.component';
import {JunteUiModule} from 'junte-ui';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    IssuesComponent,
    IssueProblemsComponent,
    TimeExpensesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DatePipesModule,
    ArrayPipesModule,
    JunteUiModule
  ],
  exports: [
    IssuesComponent,
    IssueProblemsComponent,
    TimeExpensesComponent
  ],
  providers: [
    MetricsServiceProvider,
    IssuesServiceProvider,
    TimeExpensesServiceProvider
  ]
})
export class IssuesModule {
}
