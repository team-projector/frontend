import { NgModule } from '@angular/core';
import { IncludesPipe, JoinPipe, MockArrayPipe } from './array';

@NgModule({
  declarations: [
    MockArrayPipe,
    IncludesPipe,
    JoinPipe
  ],
  exports: [
    MockArrayPipe,
    IncludesPipe,
    JoinPipe
  ]
})
export class ArrayPipesModule {
}
