import { NgModule } from '@angular/core';
import { JoinPipe, MockArrayPipe } from './array';

@NgModule({
  declarations: [
    MockArrayPipe,
    JoinPipe
  ],
  exports: [
    MockArrayPipe,
    JoinPipe
  ]
})
export class ArrayPipesModule {
}
