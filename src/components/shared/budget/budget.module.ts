import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressBarModule, StackModule } from '@esanum/ui';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { BudgetComponent } from 'src/components/shared/budget/budget.component';

@NgModule({
  imports: [
    CommonModule,
    ProgressBarModule,
    StackModule,
    MoneyPipesModule
  ],
  declarations: [
    BudgetComponent
  ],
  exports: [
    BudgetComponent
  ]
})
export class BudgetModule {

}
