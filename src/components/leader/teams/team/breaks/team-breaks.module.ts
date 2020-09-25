import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { BreaksListModule } from 'src/components/shared/breaks/list/breaks-list.module';
import { TeamBreaksRoutingModule } from 'src/components/leader/teams/team/breaks/team-breaks-routing.module';
import { TeamBreaksComponent } from 'src/components/leader/teams/team/breaks/team-breaks.component';
import { MeUserResolver } from 'src/resolvers/me';
import { TeamBreaksListTableComponent } from './breaks-list-table/breaks-list-table.component';
import { TeamBreaksListGanttComponent } from './breaks-list-gantt/breaks-list-gantt.component';

@NgModule({
  declarations: [
    TeamBreaksComponent,
    TeamBreaksListTableComponent,
    TeamBreaksListGanttComponent
  ],
  imports: [
    BreaksListModule,
    CommonModule,
    JunteUiModule,
    TeamBreaksRoutingModule
  ],
  providers: [
    MeUserResolver
  ]
})
export class TeamBreaksModule {
}
