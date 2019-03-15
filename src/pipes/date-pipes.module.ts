import { NgModule } from '@angular/core';
import { DurationPipe } from './date';

@NgModule({
  declarations: [
    DurationPipe
  ],
  exports: [
    DurationPipe
  ]
})
export class DatePipesModule {
}
