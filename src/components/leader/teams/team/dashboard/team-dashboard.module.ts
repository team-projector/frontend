import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { TeamProgressComponent } from 'src/components/leader/teams/team/dashboard/progress/team-progress.component';
import { TeamDashboardComponent } from 'src/components/leader/teams/team/dashboard/team-dashboard.component';
import { PercentagePipe } from 'src/components/leader/teams/team/dashboard/team.pipe';
import { OutletModule } from 'src/components/outlet/outlet.module';
import { DueDateModule } from 'src/components/shared/due-date/due-date.module';
import { MetricsTypeModule } from 'src/components/shared/metrics-type/metrics-type.module';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { ProjectsSummaryModule } from '../../../../shared/dashboard/projects/projects-summary.module';
import { TeamDashboardRoutingModule } from './team-dashboard-routing.module';

@NgModule({
  declarations: [
    TeamDashboardComponent,
    TeamProgressComponent,
    PercentagePipe
  ],
  imports: [
    TeamDashboardRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    MetricsTypeModule,
    DatePipesModule,
    OutletModule,
    ArrayPipesModule,
    DueDateModule,
    DateFnsModule,
    ProjectsSummaryModule
  ]
})
export class TeamDashboardModule {

}