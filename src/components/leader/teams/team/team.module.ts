import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { TeamComponent } from 'src/components/leader/teams/team/team.component';
import { TeamRoutingModule } from './team-routing.module';

@NgModule({
  declarations: [
    TeamComponent
  ],
  imports: [
    TeamRoutingModule,

    CommonModule,
    JunteUiModule
  ]
})
export class TeamModule {

}
