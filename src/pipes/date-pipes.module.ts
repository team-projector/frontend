import { NgModule } from '@angular/core';
import { DurationPipe, IsFuturePipe, IsPastPipe, IsTodayPipe, PeriodPipe } from './date';

@NgModule({
  declarations: [
    DurationPipe,
    PeriodPipe,
    IsPastPipe,
    IsFuturePipe,
    IsTodayPipe
  ],
  exports: [
    DurationPipe,
    PeriodPipe,
    IsPastPipe,
    IsFuturePipe,
    IsTodayPipe
  ]
})
export class DatePipesModule {

}
