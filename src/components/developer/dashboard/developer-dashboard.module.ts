import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { BreaksModule } from 'src/components/breaks/breaks.module';
import { DatePipesModule } from '../../../pipes/date-pipes.module';
import { NumberPipesModule } from '../../../pipes/number-pipes.module';
import { DeveloperDashboardRoutingModule } from './developer-dashboard-routing.module';
import { DeveloperDashboardComponent } from './developer-dashboard.component';
import { DeveloperPayrollComponent } from './payroll/developer-payroll.component';
import { DeveloperProgressComponent } from './progress/developer-progress.component';
import { DeveloperProjectsComponent } from './projects/developer-projects.component';

@NgModule({
  declarations: [
    DeveloperDashboardComponent,
    DeveloperProgressComponent,
    DeveloperProjectsComponent,
    DeveloperPayrollComponent
  ],
  imports: [
    DeveloperDashboardRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    DateFnsModule,
    DatePipesModule,
    NumberPipesModule,
    BreaksModule,
    JunteUiModule
  ]
})
export class DeveloperDashboardModule {

}
