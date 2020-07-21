import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JunteUiModule } from '@junte/ui';
import { AppFooterModule } from 'src/components/app-footer/app-footer.module';
import { TeamIssuesModule } from 'src/components/leader/teams/team/issues/team-issues.module';
import { TeamComponent } from 'src/components/leader/teams/team/team.component';
import { TeamsRoutingModule } from 'src/components/leader/teams/teams-routing.module';
import { TeamsComponent } from 'src/components/leader/teams/teams.component';
import { OutletModule } from 'src/components/outlet/outlet.module';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { DueDateResolver, IssuesTypeResolver } from 'src/resolvers/issue';
import { MergeRequestStateResolver } from 'src/resolvers/merge-request';
import { ProjectResolver } from 'src/resolvers/project';
import { TeamResolver } from 'src/resolvers/team';
import { UserResolver } from 'src/resolvers/user';

@NgModule({
  declarations: [
    TeamsComponent,
    TeamComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    RouterModule,
    TeamsRoutingModule,
    DatePipesModule,
    OutletModule,
    ArrayPipesModule,
    TeamIssuesModule,
    AppFooterModule
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
