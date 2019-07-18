import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {LeaderRoutingModule} from './leader-routing.module';
import {JunteUiModule} from 'junte-ui';
import {DatePipesModule} from '../../pipes/date-pipes.module';
import {TeamResolver} from 'src/resolvers/team';
import {LeaderComponent} from 'src/components/leader/leader.component';

@NgModule({
  declarations: [
    LeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeaderRoutingModule,
    JunteUiModule,
    DatePipesModule
  ],
  providers: [
    TeamResolver
  ]
})
export class LeaderModule {
}
