import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { BudgetModule } from 'src/components/shared/budget/budget.module';
import { ProfitModule } from 'src/components/shared/profit/profit.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { MilestonesListComponent } from './milestones-list.component';

@NgModule({
  declarations: [
    MilestonesListComponent
  ],
  exports: [
    MilestonesListComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule,
    ReactiveFormsModule,
    DateFnsModule,
    MoneyPipesModule,
    DatePipesModule,
    ProfitModule,
    BudgetModule
  ]
})
export class MilestonesListModule {

}
