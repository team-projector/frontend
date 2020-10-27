import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { TeamBreaksListGanttComponent } from 'src/components/leader/teams/team/work-breaks/gantt/breaks-list-gantt.component';
import { TeamBreaksRoutingModule } from 'src/components/leader/teams/team/work-breaks/team-breaks-routing.module';
import { TeamBreaksComponent } from 'src/components/leader/teams/team/work-breaks/team-breaks.component';
import { WorkBreaksListModule } from 'src/components/shared/work-breaks/list/work-breaks-list.module';
import { UserCardModule } from '../../../../shared/users/card/user-card.module';
import { TeamBreaksListTableComponent } from './list/breaks-list-table.component';

@NgModule({
  declarations: [
    TeamBreaksComponent,
    TeamBreaksListTableComponent,
    TeamBreaksListGanttComponent
  ],
  imports: [
    TeamBreaksRoutingModule,
    CommonModule,
    JunteUiModule,
    DateFnsModule,
    WorkBreaksListModule,
    UserCardModule,
    ReactiveFormsModule
  ]
})
export class TeamBreaksModule {
}
