import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManagerComponent} from './manager.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    data: {breadcrumb: 'Manager'},
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'milestones'
      },
      {
        path: 'milestones',
        loadChildren: './milestones/milestones.module#MilestonesModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule {
}
