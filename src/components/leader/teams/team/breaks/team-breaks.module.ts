import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from 'junte-ui';
import { BreaksModule } from 'src/components/breaks/breaks.module';
import { TeamBreaksRoutingModule } from 'src/components/leader/teams/team/breaks/team-breaks-routing.module';
import { TeamBreaksComponent } from 'src/components/leader/teams/team/breaks/team-breaks.component';
import { BreaksTypeResolver } from 'src/resolvers/break';
import { MeUserResolver } from 'src/resolvers/me';

@NgModule({
  declarations: [
    TeamBreaksComponent
  ],
  imports: [
    BreaksModule,
    CommonModule,
    JunteUiModule,
    TeamBreaksRoutingModule
  ],
  providers: [
    MeUserResolver,
    BreaksTypeResolver
  ]
})
export class TeamBreaksModule {
}
