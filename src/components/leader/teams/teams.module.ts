import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamsComponent} from 'src/components/leader/teams/teams.component';
import {TeamComponent} from 'src/components/leader/teams/team/team.component';
import {PercentagePipe, PeriodPipe} from 'src/components/leader/teams/team/team.pipe';
import {JunteUiModule} from 'junte-ui';
import {DatePipesModule} from 'src/pipes/date-pipes.module';
import {TeamsRoutingModule} from 'src/components/leader/teams/teams-routing.module';
import {TeamResolver} from 'src/resolvers/team';
import {TeamTimeExpensesListComponent} from 'src/components/leader/teams/team/issues/time-expenses/time-expenses.component';
import {TeamIssuesListComponent} from 'src/components/leader/teams/team/issues/issues-list/issues-list.component';
import {OutletModule} from 'src/components/outlet/outlet.module';
import {UserResolver} from 'src/resolvers/user';
import {TeamCalendarComponent} from 'src/components/leader/teams/team/calendar/team-calendar.component';
import {RouterModule} from '@angular/router';
import {IssuesModule} from '../../issues/issues.module';
import {DueDateResolver, IssuesTypeResolver} from '../../../resolvers/issue';
import {ArrayPipesModule} from '../../../pipes/array-pipes.module';
import {ProjectResolver} from '../../../resolvers/project';
import {ReactiveFormsModule} from '@angular/forms';
import {MetricsTypeModule} from 'src/components/metrics-type/metrics-type.module';
import {TeamMergeRequestsListComponent} from './team/issues/merge-requests/merge-requests.component';
import {MergeRequestStateResolver} from '../../../resolvers/merge-request';
import {DueDateModule} from '../../due-date/due-date.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    RouterModule,
    TeamsRoutingModule,
    MetricsTypeModule,
    DatePipesModule,
    OutletModule,
    IssuesModule,
    ArrayPipesModule,
    DueDateModule
  ],
  declarations: [
    TeamsComponent,
    TeamComponent,
    TeamTimeExpensesListComponent,
    TeamMergeRequestsListComponent,
    TeamIssuesListComponent,
    TeamCalendarComponent,
    PercentagePipe,
    PeriodPipe
  ],
  providers: [
    TeamResolver,
    UserResolver,
    ProjectResolver,
    DueDateResolver,
    IssuesTypeResolver,
    MergeRequestStateResolver
  ]
})
export class TeamsModule {
}
