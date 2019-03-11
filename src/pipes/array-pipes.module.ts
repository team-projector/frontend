import {NgModule} from '@angular/core';
import {IncludesPipe, MockArrayPipe} from './array';

@NgModule({
  declarations: [
    MockArrayPipe,
    IncludesPipe
  ],
  exports: [
    MockArrayPipe,
    IncludesPipe
  ]
})
export class ArrayPipesModule {
}
