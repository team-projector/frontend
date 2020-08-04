import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeUserResolver } from 'src/resolvers/me';
import { DeveloperBreaksListTableComponent } from './breaks-list-table/breaks-list-table.component';
import { DeveloperBreaksListGanttComponent } from './breaks-list-gantt/breaks-list-gantt.component';
import { DeveloperBreaksComponent } from './developer-breaks.component';

export const WORK_BREAKS_BREADCRUMB = $localize`:@@label.work_breaks:Work Breaks`;

const routes: Routes = [
  {
    path: '',
    component: DeveloperBreaksComponent,
    children: [
      {
        path: '',
        data: {breadcrumb: WORK_BREAKS_BREADCRUMB},
        component: DeveloperBreaksListTableComponent,
        resolve: {
          user: MeUserResolver
        }
      },
      {
        path: 'gantt',
        data: {breadcrumb: 'Gantt'},
        component: DeveloperBreaksListGanttComponent,
        resolve: {
          user: MeUserResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperBreaksRoutingModule {
}
