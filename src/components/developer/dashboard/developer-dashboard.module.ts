import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { WorkBreaksListModule } from 'src/components/shared/work-breaks/list/work-breaks-list.module';
import { DatePipesModule } from '../../../pipes/date-pipes.module';
import { NumberPipesModule } from '../../../pipes/number-pipes.module';
import { ProjectsSummaryModule } from '../../shared/dashboard/projects/projects-summary.module';
import { DueDateModule } from '../../shared/due-date/due-date.module';
import { DeveloperDashboardRoutingModule } from './developer-dashboard-routing.module';
import { DeveloperDashboardComponent } from './developer-dashboard.component';
import { DeveloperPayrollComponent } from './payroll/developer-payroll.component';
import { DeveloperProgressComponent } from './progress/developer-progress.component';
import { DeveloperWorkBreaksComponent } from './work-breaks/developer-work-breaks.component';

@NgModule({
  declarations: [
    DeveloperDashboardComponent,
    DeveloperProgressComponent,
    DeveloperPayrollComponent,
    DeveloperWorkBreaksComponent
  ],
  imports: [
    DeveloperDashboardRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    DateFnsModule,
    DatePipesModule,
    NumberPipesModule,
    DueDateModule,
    WorkBreaksListModule,
    JunteUiModule,
    ProjectsSummaryModule
  ]
})
export class DeveloperDashboardModule {

}
