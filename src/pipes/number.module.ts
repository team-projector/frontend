import { NgModule } from '@angular/core';
import { PercentagePipe } from './number';

@NgModule({
  declarations: [
    PercentagePipe
  ],
  exports: [
    PercentagePipe
  ]
})
export class NumberModule {
}
