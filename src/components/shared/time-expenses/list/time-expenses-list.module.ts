import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  BadgeModule,
  ButtonModule,
  DatePickerModule,
  FormModule,
  InformerModule,
  LinkModule,
  StackModule,
  SwitcherModule,
  TableModule
} from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { IssueCardModule } from '../../issues/card/issue-card.module';
import { MergeRequestCardModule } from '../../merge-requests/card/merge-request-card.module';
import { UserCardModule } from '../../users/card/user-card.module';
import { TimeExpensesListComponent } from './time-expenses-list.component';
import { GetOwnerTypePipe } from './time-expenses-list.pipes';

@NgModule({
  declarations: [
    TimeExpensesListComponent,
    GetOwnerTypePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    InformerModule,
    FormModule,
    StackModule,
    TableModule,
    DatePickerModule,
    ButtonModule,
    SwitcherModule,
    BadgeModule,
    LinkModule,
    DateFnsModule,
    DatePipesModule,
    MoneyPipesModule,

    IssueCardModule,
    UserCardModule,
    MergeRequestCardModule
  ],
  exports: [
    TimeExpensesListComponent
  ]
})
export class TimeExpensesListModule {

}
