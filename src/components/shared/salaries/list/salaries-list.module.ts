import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DatePeriodModule,
  FormModule,
  IconModule,
  LabelModule,
  LinkModule,
  StackModule,
  TableModule
} from '@esanum/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { SalariesListComponent } from 'src/components/shared/salaries/list/salaries-list.component';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { UserCardModule } from '../../users/card/user-card.module';

@NgModule({
  declarations: [
    SalariesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FormModule,
    TableModule,
    LinkModule,
    StackModule,
    DatePeriodModule,
    LabelModule,
    IconModule,
    DateFnsModule,
    DatePipesModule,
    MoneyPipesModule,
    UserCardModule
  ],
  exports: [
    SalariesListComponent
  ]
})
export class SalariesListModule {

}
