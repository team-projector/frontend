import {NgModule} from '@angular/core';
import {DurationPipe, PeriodPipe} from './date';

@NgModule({
  declarations: [
    DurationPipe,
    PeriodPipe
  ],
  exports: [
    DurationPipe,
    PeriodPipe
  ]
})
export class DatePipesModule {
}
