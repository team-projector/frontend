import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { ProfitComponent } from './profit.component';

@NgModule({
  imports: [
    CommonModule,
    JunteUiModule,
    MoneyPipesModule
  ],
  declarations: [
    ProfitComponent
  ],
  exports: [
    ProfitComponent
  ]
})
export class ProfitModule {

}
