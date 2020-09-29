import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { DueDateModule } from 'src/components/shared/due-date/due-date.module';
import { IssueCardComponent } from 'src/components/shared/issues/card/issue-card.component';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { IssuePipesModule } from '../../../../pipes/issue-pipes.module';

@NgModule({
  declarations: [
    IssueCardComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule,

    DueDateModule,
    DateFnsModule,
    DatePipesModule,
    ArrayPipesModule,
    IssuePipesModule
  ],
  exports: [
    IssueCardComponent
  ]
})
export class IssueCardModule {

}