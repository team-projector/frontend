import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {LeaderRoutingModule} from './leader-routing.module';
import {TeamComponent} from './team/team.component';
import {TeamsServiceProvider} from '../../services/teams/provider';
import {TeamMembersPipe} from './pipes';
import {JunteUiModule} from 'junte-ui';

@NgModule({
  declarations: [
    TeamComponent,
    TeamMembersPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeaderRoutingModule,
    JunteUiModule
  ],
  providers: [
    TeamsServiceProvider
  ]
})
export class LeaderModule {
}
