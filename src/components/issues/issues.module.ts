import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JunteUiModule } from 'junte-ui';
import { DueDateModule } from 'src/components/due-date/due-date.module';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { CurrencyRublePipeModule } from 'src/pipes/currency-ruble.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { HasLabelPipe, LabelsPipe } from './issues.pipes';
import { IssuesComponent } from './issues/issues.component';
import { MergeRequestsComponent } from './merge-requests/merge-requests.component';
import { TimeExpensesComponent } from './time-expenses/time-expenses.component';

@NgModule({
  declarations: [
    IssuesComponent,
    TimeExpensesComponent,
    MergeRequestsComponent,
    LabelsPipe,
    HasLabelPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DragDropModule,
    DatePipesModule,
    ArrayPipesModule,
    JunteUiModule,
    DueDateModule,
    CurrencyRublePipeModule
  ],
  exports: [
    IssuesComponent,
    TimeExpensesComponent,
    MergeRequestsComponent
  ]
})
export class IssuesModule {

}
