import { NgModule } from '@angular/core';
import { DurationPipe, FormatPipe, FromNowPipe, IsFuturePipe, IsTodayPipe, PeriodPipe } from './date';

@NgModule({
  declarations: [
    DurationPipe,
    PeriodPipe,
    IsFuturePipe,
    IsTodayPipe,
    FormatPipe,
    FromNowPipe
  ],
  exports: [
    DurationPipe,
    PeriodPipe,
    IsFuturePipe,
    IsTodayPipe,
    FormatPipe,
    FromNowPipe
  ]
})
export class DatePipesModule {
}
