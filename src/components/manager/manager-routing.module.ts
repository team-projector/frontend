import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManagerComponent} from './manager.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    data: {breadcrumb: $localize`:@@label.manager:Manager`},
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'milestones'
      },
      {
        path: 'milestones',
        loadChildren: () => import('./milestones/milestones.module').then(m => m.MilestonesModule)
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
