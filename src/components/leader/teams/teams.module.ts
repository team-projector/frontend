import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from 'src/components/leader/teams/teams.component';
import { TeamComponent } from 'src/components/leader/teams/team/team.component';
import { PercentagePipe } from 'src/components/leader/teams/team/team.pipe';
import { JunteUiModule } from 'junte-ui';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { TeamsRoutingModule } from 'src/components/leader/teams/teams-routing.module';
import { TeamResolver } from 'src/resolvers/team';
import { TeamTimeExpensesListComponent } from 'src/components/leader/teams/team/issues/time-expenses/time-expenses.component';
import { TeamIssuesListComponent } from 'src/components/leader/teams/team/issues/issues-list/issues-list.component';
import { OutletModule } from 'src/components/outlet/outlet.module';
import { UserResolver } from 'src/resolvers/user';
import { TeamCalendarComponent } from 'src/components/leader/teams/team/calendar/team-calendar.component';
import { RouterModule } from '@angular/router';
import { IssuesModule } from '../../issues/issues.module';

@NgModule({
  declarations: [
    TeamsComponent,
    TeamComponent,
    TeamTimeExpensesListComponent,
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
    OutletModule,
    IssuesModule
  ],
  providers: [
    TeamResolver,
    UserResolver
  ]
})
export class TeamsModule {
}
