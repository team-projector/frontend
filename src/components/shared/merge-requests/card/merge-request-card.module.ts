import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule, IconModule, LinkModule, StackModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { DueDateModule } from 'src/components/shared/due-date/due-date.module';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { MergeRequestCardComponent } from './merge-request-card.component';

@NgModule({
  declarations: [
    MergeRequestCardComponent
  ],
  imports: [
    CommonModule,
    StackModule,
    AvatarModule,
    IconModule,
    LinkModule,
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
