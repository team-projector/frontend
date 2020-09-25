import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GanttPipesModule, JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { BreakDeclineComponent } from 'src/components/shared/breaks/decline/break-decline.component';
import { BreakEditComponent } from 'src/components/shared/breaks/edit/break-edit.component';
import { BreaksGanttComponent } from '../gantt/breaks-gantt.components';
import { BreaksListComponent } from './breaks-list.component';


@NgModule({
  declarations: [
    BreakEditComponent,
    BreakDeclineComponent,
    BreaksGanttComponent,
    BreaksListComponent
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
    BreaksListComponent
  ]
})
export class BreaksListModule {

}
