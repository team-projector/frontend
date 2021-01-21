import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AppLayoutModule,
  AvatarModule,
  BlockModule,
  ButtonModule,
  CalendarModule,
  CircleBarModule,
  DotModule,
  FormModule,
  GridModule,
  IconModule,
  LabelModule,
  MenuModule,
  StackModule
} from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { NumberPipesModule } from 'src/pipes/number-pipes.module';
import { ProjectsSummaryModule } from '../../shared/dashboard/projects/projects-summary.module';
import { DueDateModule } from '../../shared/due-date/due-date.module';
import { MetricsTypeModule } from '../../shared/metrics-type/metrics-type.module';
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
    AppLayoutModule,
    GridModule,
    StackModule,
    BlockModule,
    CircleBarModule,
    DotModule,
    FormModule,
    ButtonModule,
    CalendarModule,
    MenuModule,
    AvatarModule,
    LabelModule,
    IconModule,

    DatePipesModule,
    NumberPipesModule,
    MoneyPipesModule,
    DueDateModule,
    ProjectsSummaryModule,
    MetricsTypeModule
  ]
})
export class DeveloperDashboardModule {

}
