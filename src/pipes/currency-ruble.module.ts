import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyLocalPipe } from 'src/pipes/currency-ruble';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CurrencyLocalPipe
  ],
  exports: [
    CurrencyLocalPipe
  ]
})
export class CurrencyRublePipeModule {
}
