import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {IssuesModule} from '../issues/issues.module';
import {LeaderRoutingModule} from './leader-routing.module';
import {UserResolver} from './resolvers';
import {TeamComponent} from './team/team.component';
import {UsersServiceProvider} from '../../services/users/provider';
import {TeamsServiceProvider} from '../../services/teams/provider';
import {TeamMembersPipe} from './pipes';

@NgModule({
  declarations: [
    TeamComponent,
    TeamMembersPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeaderRoutingModule,
    IssuesModule
  ],
  providers: [
    UsersServiceProvider,
    UserResolver,
    TeamsServiceProvider
  ]
})
export class LeaderModule {
}
