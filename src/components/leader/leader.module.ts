import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LeaderRoutingModule } from './leader-routing.module';
import { TeamsServiceProvider } from '../../services/teams/provider';
import { JunteUiModule } from 'junte-ui';
import { TeamMembersResolver } from '../../resolvers/team-members';
import { DeveloperDashboardModule } from '../developer/dashboard/developer-dashboard.module';
import { DatePipesModule } from '../../pipes/date-pipes.module';
import { TeamResolver } from 'src/resolvers/team';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeaderRoutingModule,
    JunteUiModule,
    DatePipesModule,
    DeveloperDashboardModule
  ],
  providers: [
    TeamsServiceProvider,
    TeamMembersResolver,
    TeamResolver
  ]
})
export class LeaderModule {
}
