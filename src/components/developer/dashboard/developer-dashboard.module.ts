import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { BreaksListModule } from 'src/components/shared/breaks/list/breaks-list.module';
import { DatePipesModule } from '../../../pipes/date-pipes.module';
import { NumberPipesModule } from '../../../pipes/number-pipes.module';
import { DueDateModule } from '../../shared/due-date/due-date.module';
import { DeveloperDashboardRoutingModule } from './developer-dashboard-routing.module';
import { DeveloperDashboardComponent } from './developer-dashboard.component';
import { DeveloperPayrollComponent } from './payroll/developer-payroll.component';
import { DeveloperProgressComponent } from './progress/developer-progress.component';
import { DeveloperProjectsComponent } from './projects/developer-projects.component';
import { DeveloperWorkBreaksComponent } from './work-breaks/developer-work-breaks.component';

@NgModule({
  declarations: [
    DeveloperDashboardComponent,
    DeveloperProgressComponent,
    DeveloperProjectsComponent,
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
    BreaksListModule,
    JunteUiModule
  ]
})
export class DeveloperDashboardModule {

}
