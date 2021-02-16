import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  BadgeModule,
  FormModule,
  InformerModule,
  LabelModule,
  MenuModule,
  StackModule,
  SwitcherModule,
  TableModule
} from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { DueDateModule } from 'src/components/shared/due-date/due-date.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { IssuePipesModule } from 'src/pipes/issue-pipes.module';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { EarnModule } from '../../earn/earn.module';
import { WorkProgressModule } from '../../work-progress/work-progress.module';
import { MergeRequestCardModule } from '../card/merge-request-card.module';
import { MergeRequestsListComponent } from './merge-requests-list.component';

@NgModule({
  declarations: [
    MergeRequestsListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    InformerModule,
    FormModule,
    TableModule,
    SwitcherModule,
    StackModule,
    BadgeModule,
    MenuModule,
    LabelModule,
    DateFnsModule,
    DueDateModule,
    DatePipesModule,
    MoneyPipesModule,

    MergeRequestCardModule,
    EarnModule,
    IssuePipesModule,
    WorkProgressModule
  ],
  exports: [
    MergeRequestsListComponent
  ]
})
export class MergeRequestsModule {

}
