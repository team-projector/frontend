import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { DueDateModule } from 'src/components/shared/due-date/due-date.module';
import { WorkProgressModule } from '../../work-progress/work-progress.module';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { IssuePipesModule } from 'src/pipes/issue-pipes.module';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { UserCardModule } from '../../users/card/user-card.module';
import { EarnModule } from '../../earn/earn.module';
import { IssueCardModule } from '../card/issue-card.module';
import { IssuesListComponent } from './issues-list.component';

@NgModule({
  declarations: [
    IssuesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    JunteUiModule,
    DateFnsModule,

    DatePipesModule,
    ArrayPipesModule,
    MoneyPipesModule,
    DueDateModule,
    IssueCardModule,
    IssuePipesModule,
    UserCardModule,
    EarnModule,
    WorkProgressModule
  ],
  exports: [
    IssuesListComponent
  ]
})
export class IssuesListModule {

}
