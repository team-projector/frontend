import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AvatarModule,
  BadgeModule,
  DatePeriodModule,
  FormModule,
  InformerModule,
  LabelModule, LinkModule,
  MenuModule,
  StackModule,
  SwitcherModule,
  TableModule
} from '@esanum/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { BudgetModule } from 'src/components/shared/budget/budget.module';
import { ProfitModule } from 'src/components/shared/profit/profit.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { WorkProgressModule } from '../../work-progress/work-progress.module';
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
    FormModule,
    InformerModule,
    TableModule,
    StackModule,
    SwitcherModule,
    BadgeModule,
    MenuModule,
    LabelModule,
    DatePeriodModule,
    ReactiveFormsModule,
    DateFnsModule,
    MoneyPipesModule,
    DatePipesModule,
    ProfitModule,
    BudgetModule,
    WorkProgressModule,
    LinkModule,
    AvatarModule
  ]
})
export class MilestonesListModule {

}
