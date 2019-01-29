import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarComponent} from './calendar.component';
import {WeekMetricComponent} from './week-metric.component';
import {WeekComponent} from './week/week.component';
import {ArrayPipesModule} from '../../../pipes/array-pipes.module';

@NgModule({
  declarations: [
    CalendarComponent,
    WeekComponent,
    WeekMetricComponent
  ],
  imports: [
    CommonModule,
    ArrayPipesModule
  ],
  exports: [
    CalendarComponent,
    WeekComponent,
    WeekMetricComponent
  ]
})
export class CalendarModule {
}
