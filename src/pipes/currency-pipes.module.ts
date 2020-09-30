import { NgModule } from '@angular/core';
import { CurrencyPipe } from './currency';

@NgModule({
  declarations: [
    CurrencyPipe
  ],
  exports: [
    CurrencyPipe
  ]
})
export class CurrencyPipesModule {
}
