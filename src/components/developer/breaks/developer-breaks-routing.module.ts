import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreaksGanttComponent } from 'src/components/developer/breaks/breaks-gantt/breaks-gantt.component';
import { DeveloperBreaksComponent } from './developer-breaks.component';
import { BreaksListComponent } from 'src/components/developer/breaks/breaks-list/breaks-list.component';
import { MeUserResolver } from 'src/resolvers/me';

const routes: Routes = [
  {
    path: '',
    component: DeveloperBreaksComponent,
    children: [
      {
        path: '',
        data: {breadcrumb: 'Breaks'},
        component: BreaksListComponent,
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
