import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamIssuesRoutingModule } from 'src/components/leader/teams/team/issues/team-issues-routing.module';
import { TeamIssuesComponent } from 'src/components/leader/teams/team/issues/team-issues.component';
import { PercentagePipe } from 'src/components/leader/teams/team/issues/team.pipe';
import { JunteUiModule } from 'junte-ui';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { TeamTimeExpensesListComponent } from 'src/components/leader/teams/team/issues/time-expenses/time-expenses.component';
import { TeamIssuesListComponent } from 'src/components/leader/teams/team/issues/issues/issues-list.component';
import { OutletModule } from 'src/components/outlet/outlet.module';
import { UserResolver } from 'src/resolvers/user';
import { TeamCalendarComponent } from 'src/components/leader/teams/team/issues/calendar/team-calendar.component';
import { RouterModule } from '@angular/router';
import { IssuesModule } from 'src/components/issues/issues.module';
import { DueDateResolver, IssuesTypeResolver } from 'src/resolvers/issue';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { ProjectResolver } from 'src/resolvers/project';
import { ReactiveFormsModule } from '@angular/forms';
import { MetricsTypeModule } from 'src/components/metrics-type/metrics-type.module';
import { TeamMergeRequestsListComponent } from './merge-requests/merge-requests.component';
import { MergeRequestStateResolver } from 'src/resolvers/merge-request';
import { DueDateModule } from 'src/components/due-date/due-date.module';

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
    DueDateModule
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
