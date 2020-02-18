import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';

const MANAGER_BREADCRUMB = $localize`:@@label.manager:Manager`;

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    data: {breadcrumb: MANAGER_BREADCRUMB},
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
