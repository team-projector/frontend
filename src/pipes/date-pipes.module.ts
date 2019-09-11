import { NgModule } from '@angular/core';
import { DurationPipe, EndOfDayPipe, FormatPipe, FromNowPipe, GetDatePipe, IsFuturePipe, IsPastPipe, IsTodayPipe, PeriodPipe } from './date';

@NgModule({
  declarations: [
    DurationPipe,
    PeriodPipe,
    IsPastPipe,
    EndOfDayPipe,
    GetDatePipe,
    IsFuturePipe,
    IsTodayPipe,
    FormatPipe,
    FromNowPipe
  ],
  exports: [
    DurationPipe,
    PeriodPipe,
    IsPastPipe,
    EndOfDayPipe,
    GetDatePipe,
    IsFuturePipe,
    IsTodayPipe,
    FormatPipe,
    FromNowPipe
  ]
})
export class DatePipesModule {
}
