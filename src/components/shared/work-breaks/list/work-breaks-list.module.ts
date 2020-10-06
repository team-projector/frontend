import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GanttPipesModule, JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { BreakDeclineComponent } from 'src/components/shared/work-breaks/decline/break-decline.component';
import { BreakEditComponent } from 'src/components/shared/work-breaks/edit/break-edit.component';
import { WorkBreaksListComponent } from './work-breaks-list.component';


@NgModule({
  declarations: [
    BreakEditComponent,
    BreakDeclineComponent,
    WorkBreaksListComponent
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
    WorkBreaksListComponent
  ]
})
export class WorkBreaksListModule {

}
