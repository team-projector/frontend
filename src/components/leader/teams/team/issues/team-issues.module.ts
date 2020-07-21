import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { DueDateModule } from 'src/components/due-date/due-date.module';
import { IssuesModule } from 'src/components/issues/issues.module';
import { TeamCalendarComponent } from 'src/components/leader/teams/team/issues/calendar/team-calendar.component';
import { TeamIssuesListComponent } from 'src/components/leader/teams/team/issues/issues/issues-list.component';
import { TeamIssuesRoutingModule } from 'src/components/leader/teams/team/issues/team-issues-routing.module';
import { TeamIssuesComponent } from 'src/components/leader/teams/team/issues/team-issues.component';
import { PercentagePipe } from 'src/components/leader/teams/team/issues/team.pipe';
import { TeamTimeExpensesListComponent } from 'src/components/leader/teams/team/issues/time-expenses/time-expenses.component';
import { MetricsTypeModule } from 'src/components/metrics-type/metrics-type.module';
import { OutletModule } from 'src/components/outlet/outlet.module';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { DueDateResolver, IssuesTypeResolver } from 'src/resolvers/issue';
import { MergeRequestStateResolver } from 'src/resolvers/merge-request';
import { ProjectResolver } from 'src/resolvers/project';
import { UserResolver } from 'src/resolvers/user';
import { TeamMergeRequestsListComponent } from './merge-requests/merge-requests.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    RouterModule,
    TeamIssuesRoutingModule,
    MetricsTypeModule,
    DatePipesModule,
    OutletModule,
    IssuesModule,
    ArrayPipesModule,
    DueDateModule,
    DateFnsModule
  ],
  declarations: [
    TeamIssuesComponent,
    TeamTimeExpensesListComponent,
    TeamMergeRequestsListComponent,
    TeamIssuesListComponent,
    TeamCalendarComponent,
    PercentagePipe
  ],
  providers: [
    UserResolver,
    ProjectResolver,
    DueDateResolver,
    IssuesTypeResolver,
    MergeRequestStateResolver
  ]
})
export class TeamIssuesModule {
}
