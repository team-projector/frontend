import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { DueDateModule } from 'src/components/due-date/due-date.module';
import { IssueComponent } from 'src/components/issues/issue/issue.component';
import { GetOwnerTypePipe, HasLabelPipe, LabelsPipe } from 'src/components/issues/issues.pipes';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { IssuesComponent } from './issues/issues.component';
import { MergeRequestComponent } from './merge-request/merge-request.component';
import { MergeRequestsComponent } from './merge-requests/merge-requests.component';
import { TimeExpensesComponent } from './time-expenses/time-expenses.component';

@NgModule({
  declarations: [
    IssueComponent,
    MergeRequestComponent,
    IssuesComponent,
    MergeRequestsComponent,
    TimeExpensesComponent,
    LabelsPipe,
    HasLabelPipe,
    GetOwnerTypePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DatePipesModule,
    ArrayPipesModule,
    JunteUiModule,
    DueDateModule,
    DateFnsModule
  ],
  exports: [
    IssueComponent,
    MergeRequestComponent,
    IssuesComponent,
    MergeRequestsComponent,
    TimeExpensesComponent
  ]
})
export class IssuesModule {

}
