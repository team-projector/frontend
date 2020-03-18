import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreaksGanttComponent } from 'src/components/developer/breaks/breaks-gantt/breaks-gantt.component';
import { MeUserResolver } from 'src/resolvers/me';
import { DeveloperBreaksListComponent } from './breaks/breaks-list.component';
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
        component: DeveloperBreaksListComponent,
        resolve: {
          user: MeUserResolver
        }
      },
      {
        path: 'gantt',
        data: {breadcrumb: 'Gantt'},
        component: BreaksGanttComponent
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
