import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from 'src/components/leader/dashboard/teams/teams.component';
import { TeamComponent } from 'src/components/leader/dashboard/team/team.component';
import { PercentagePipe } from 'src/components/leader/dashboard/team/team.pipe';
import { JunteUiModule } from 'junte-ui';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { TeamsRoutingModule } from 'src/components/leader/dashboard/teams/teams-routing.module';
import { TeamResolver } from 'src/resolvers/team';
import { TeamIssuesProblemComponent } from 'src/components/leader/dashboard/team/issues/problems/problems.component';
import { TeamIssuesComponent } from 'src/components/leader/dashboard/team/issues/issues/issues.component';
import { TeamProblemsListComponent } from 'src/components/leader/dashboard/team/issues/problems-list/problems-list.component';
import { TeamIssuesListComponent } from 'src/components/leader/dashboard/team/issues/issues-list/issues-list.component';
import { OutletModule } from 'src/components/outlet/outlet.module';
import { UserResolver } from 'src/resolvers/user';

@NgModule({
  declarations: [
    TeamsComponent,
    TeamComponent,
    TeamIssuesProblemComponent,
    TeamIssuesComponent,
    TeamProblemsListComponent,
    TeamIssuesListComponent,
    PercentagePipe
  ],
  imports: [
    CommonModule,
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
