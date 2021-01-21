import { NgModule } from '@angular/core';
import { JoinPipe, MockArrayPipe, IncludesPipe } from './array';

@NgModule({
  declarations: [
    MockArrayPipe,
    JoinPipe,
    IncludesPipe
  ],
  exports: [
    MockArrayPipe,
    JoinPipe,
    IncludesPipe
  ]
})
export class ArrayPipesModule {
}
