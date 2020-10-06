import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { WorkBreaksListModule } from 'src/components/shared/work-breaks/list/work-breaks-list.module';
import { TeamBreaksRoutingModule } from 'src/components/leader/teams/team/breaks/team-breaks-routing.module';
import { TeamBreaksComponent } from 'src/components/leader/teams/team/breaks/team-breaks.component';
import { NumberPipesModule } from 'src/pipes/number-pipes.module';
import { MeUserResolver } from 'src/resolvers/me';
import { TeamBreaksListTableComponent } from './breaks-list-table/breaks-list-table.component';
import { TeamBreaksListGanttComponent } from 'src/components/leader/teams/team/breaks/breaks-list-gantt/breaks-list-gantt.component';

@NgModule({
  declarations: [
    TeamBreaksComponent,
    TeamBreaksListTableComponent,
    TeamBreaksListGanttComponent
  ],
  imports: [
    WorkBreaksListModule,
    CommonModule,
    JunteUiModule,
    TeamBreaksRoutingModule,
    DateFnsModule
  ],
  providers: [
    MeUserResolver
  ]
})
export class TeamBreaksModule {
}
