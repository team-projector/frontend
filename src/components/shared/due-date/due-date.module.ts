import { NgModule } from '@angular/core';
import { DueDateComponent } from 'src/components/shared/due-date/due-date.component';
import { CommonModule } from '@angular/common';
import { JunteUiModule } from '@junte/ui';
import { DueDatePipe } from 'src/components/shared/due-date/due-date.pipe';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';


@NgModule({
  imports: [
    CommonModule,
    JunteUiModule,
    ArrayPipesModule
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
