import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { DueDateModule } from '../../due-date/due-date.module';
import { ProjectsSummaryComponent } from './projects-summary.component';

@NgModule({
  declarations: [
    ProjectsSummaryComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule,
    DateFnsModule,
    DatePipesModule,
    DueDateModule
  ],
  exports: [
    ProjectsSummaryComponent
  ]
})
export class ProjectsSummaryModule {

}
