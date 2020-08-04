import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GanttPipesModule, JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { BreakDeclineComponent } from 'src/components/breaks/break-decline/break-decline.component';
import { BreakEditComponent } from 'src/components/breaks/break-edit/break-edit.component';
import { BreaksGanttComponent } from './breaks-gantt/breaks-gantt.components';
import { BreaksTableComponent } from './breaks-table/breaks-table.component';


@NgModule({
  declarations: [
    BreakEditComponent,
    BreakDeclineComponent,
    BreaksGanttComponent,
    BreaksTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    JunteUiModule,
    DateFnsModule,
    GanttPipesModule
  ],
  entryComponents: [
    BreakEditComponent,
    BreakDeclineComponent
  ],
  exports: [
    BreakEditComponent,
    BreakDeclineComponent,
    BreaksGanttComponent,
    BreaksTableComponent
  ]
})
export class BreaksModule {

}
