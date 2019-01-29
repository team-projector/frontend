import {NgModule} from '@angular/core';
import {CopyDatePipe, DurationPipe} from './date';

@NgModule({
  declarations: [
    DurationPipe,
    CopyDatePipe
  ],
  exports: [
    DurationPipe,
    CopyDatePipe
  ]
})
export class DatePipesModule {
}
