import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {IssuesModule} from '../issues/issues.module';
import {LeaderRoutingModule} from './leader-routing.module';
import {UserResolver} from './resolvers';
import {TeamComponent} from './team/team.component';
import {UsersServiceProvider} from '../../services/users/provider';

@NgModule({
  declarations: [
    TeamComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeaderRoutingModule,
    IssuesModule
  ],
  providers: [
    UsersServiceProvider,
    UserResolver
  ]
})
export class LeaderModule {
}
