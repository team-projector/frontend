import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from 'src/components/leader/teams/teams.component';
import { TeamComponent } from 'src/components/leader/teams/team/team.component';
import { PercentagePipe } from 'src/components/leader/teams/team/team.pipe';
import { JunteUiModule } from 'junte-ui';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { TeamsRoutingModule } from 'src/components/leader/teams/teams-routing.module';
import { TeamResolver } from 'src/resolvers/team';
import { TeamIssuesProblemComponent } from 'src/components/leader/teams/team/issues/problems/problems.component';
import { TeamIssuesComponent } from 'src/components/leader/teams/team/issues/issues/issues.component';
import { TeamProblemsListComponent } from 'src/components/leader/teams/team/issues/problems-list/problems-list.component';
import { TeamIssuesListComponent } from 'src/components/leader/teams/team/issues/issues-list/issues-list.component';
import { OutletModule } from 'src/components/outlet/outlet.module';
import { UserResolver } from 'src/resolvers/user';
import { TeamCalendarComponent } from 'src/components/leader/teams/team/team-calendar/team-calendar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TeamsComponent,
    TeamComponent,
    TeamIssuesProblemComponent,
    TeamIssuesComponent,
    TeamProblemsListComponent,
    TeamIssuesListComponent,
    TeamCalendarComponent,
    PercentagePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    TeamsRoutingModule,
    JunteUiModule,
    DatePipesModule,
    OutletModule
  ],
  exports: [
    TeamsComponent,
    TeamComponent,
    TeamIssuesProblemComponent,
    TeamIssuesComponent,
    TeamProblemsListComponent,
    TeamCalendarComponent,
    TeamIssuesListComponent,
    PercentagePipe
  ],
  providers: [
    TeamResolver,
    UserResolver
  ]
})
export class TeamsModule {
}
