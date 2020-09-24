import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { DueDateModule } from 'src/components/due-date/due-date.module';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { MergeRequestCardComponent } from './merge-request-card.component';

@NgModule({
  declarations: [
    MergeRequestCardComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule,
    DueDateModule,
    DateFnsModule,
    DatePipesModule,
    ArrayPipesModule,
  ],
  exports: [
    MergeRequestCardComponent
  ]
})
export class MergeRequestCardModule {

}
