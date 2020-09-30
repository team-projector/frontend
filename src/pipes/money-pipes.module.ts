import { NgModule } from '@angular/core';
import { MoneyPipe } from './money';

@NgModule({
  declarations: [
    MoneyPipe
  ],
  exports: [
    MoneyPipe
  ]
})
export class MoneyPipesModule {

}
