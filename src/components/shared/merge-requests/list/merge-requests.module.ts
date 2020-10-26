import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { DueDateModule } from 'src/components/shared/due-date/due-date.module';
import { DatePipesModule } from '../../../../pipes/date-pipes.module';
import { MoneyPipesModule } from '../../../../pipes/money-pipes.module';
import { EarnModule } from '../../earn/earn.module';
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

    JunteUiModule,
    DateFnsModule,
    DueDateModule,
    DatePipesModule,
    MoneyPipesModule,

    MergeRequestCardModule,
    EarnModule
  ],
  exports: [
    MergeRequestsListComponent
  ]
})
export class MergeRequestsModule {

}
