import {NgModule} from '@angular/core';
import {MockArrayPipe} from './array';

@NgModule({
  declarations: [
    MockArrayPipe
  ],
  exports: [
    MockArrayPipe
  ]
})
export class ArrayPipesModule {
}
