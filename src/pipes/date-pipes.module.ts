import {NgModule} from '@angular/core';
import {DurationPipe, FromNowPipe, PeriodPipe} from './date';

@NgModule({
  declarations: [
    DurationPipe,
    PeriodPipe,
    FromNowPipe
  ],
  exports: [
    DurationPipe,
    PeriodPipe,
    FromNowPipe
  ]
})
export class DatePipesModule {
}
