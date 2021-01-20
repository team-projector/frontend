import { NgModule } from '@angular/core';
import { DateFnsModule } from 'ngx-date-fns';
import { DueDateComponent } from 'src/components/shared/due-date/due-date.component';
import { CommonModule } from '@angular/common';
import { LabelModule } from '@junte/ui';
import { DueDatePipe } from 'src/components/shared/due-date/due-date.pipes';

@NgModule({
  imports: [
    CommonModule,
    LabelModule,
    DateFnsModule
  ],
  declarations: [
    DueDateComponent,
    DueDatePipe
  ],
  exports: [
    DueDateComponent,
    DueDatePipe
  ],
})
export class DueDateModule {

}
