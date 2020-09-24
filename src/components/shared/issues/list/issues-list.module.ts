import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { DueDateModule } from 'src/components/due-date/due-date.module';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { IssuePipesModule } from '../../../../pipes/issue-pipes.module';
import { IssueCardModule } from '../card/issue-card.module';
import { IssuesListComponent } from './issues-list.component';

@NgModule({
  declarations: [
    IssuesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    RouterModule,
    DatePipesModule,
    ArrayPipesModule,
    JunteUiModule,

    IssueCardModule,

    DueDateModule,
    DateFnsModule,
    IssuePipesModule
  ],
  exports: [
    IssuesListComponent
  ]
})
export class IssuesListModule {

}
