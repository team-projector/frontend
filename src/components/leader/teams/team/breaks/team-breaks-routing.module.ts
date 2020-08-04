import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamBreaksComponent } from 'src/components/leader/teams/team/breaks/team-breaks.component';
import { TeamResolver } from 'src/resolvers/team';
import { UserResolver } from 'src/resolvers/user';
import { TeamBreaksListTableComponent } from './breaks-list-table/breaks-list-table.component';
import { TeamBreaksListGanttComponent } from './breaks-list-gantt/breaks-list-gantt.component';

export const WORK_BREAKS_BREADCRUMB = $localize`:@@label.work_breaks:Work Breaks`;

const routes: Routes = [
  {
    path: '',
    component: TeamBreaksComponent,
    resolve: {
      team: TeamResolver,
      user: UserResolver
    },
    children: [
      {
        path: '',
        data: {breadcrumb: WORK_BREAKS_BREADCRUMB},
        component: TeamBreaksListTableComponent
      },
      {
        path: 'gantt',
        data: {breadcrumb: WORK_BREAKS_BREADCRUMB},
        component: TeamBreaksListGanttComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamBreaksRoutingModule {
}
