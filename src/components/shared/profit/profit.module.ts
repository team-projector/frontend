import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressBarModule, StackModule } from '@junte/ui';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { ProfitComponent } from './profit.component';

@NgModule({
  imports: [
    CommonModule,
    ProgressBarModule,
    StackModule,
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
