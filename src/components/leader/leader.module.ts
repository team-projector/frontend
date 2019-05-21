import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LeaderRoutingModule } from './leader-routing.module';
import { TeamsComponent } from './teams/teams.component';
import { TeamsServiceProvider } from '../../services/teams/provider';
import { JunteUiModule } from 'junte-ui';
import { TeamComponent } from './team/team.component';
import { TeamMembersResolver } from '../../resolvers/team-members';
import {DeveloperDashboardModule} from '../developer/dashboard/developer-dashboard.module';

@NgModule({
  declarations: [
    TeamsComponent,
    TeamComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeaderRoutingModule,
    JunteUiModule,
    DeveloperDashboardModule,
  ],
  providers: [
    TeamsServiceProvider,
    TeamMembersResolver
  ]
})
export class LeaderModule {
}
