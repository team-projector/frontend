import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TableModule} from '../shared/table/table.module';
import {CalendarModule} from '../shared/calendar/calendar.module';
import {MetricsServiceProvider} from '../../services/metrics/provider';
import {IssuesServiceProvider} from '../../services/issues/provider';
import {IssuesListComponent} from './list/issues-list.component';
import {DatePipesModule} from '../../pipes/date-pipes.module';
import {ArrayPipesModule} from '../../pipes/array-pipes.module';
import {TimeExpensesServiceProvider} from '../../services/time-expenses/provider';
import {IssuesComponent} from './issues/issues.component';
import {TimeExpensesComponent} from './time-expenses/time-expenses.component';

@NgModule({
  declarations: [
    IssuesListComponent,
    IssuesComponent,
    TimeExpensesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    CalendarModule,
    DatePipesModule,
    ArrayPipesModule
  ],
  exports: [
    IssuesListComponent
  ],
  providers: [
    MetricsServiceProvider,
    IssuesServiceProvider,
    TimeExpensesServiceProvider
  ]
})
export class IssuesModule {
}
