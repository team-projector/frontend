import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperComponent } from 'src/components/developer/developer.component';

const SALARIES_BREADCRUMB = $localize`:@@label.salaries:Salaries`;
const WORK_BREAKS_BREADCRUMB = $localize`:@@label.work_breaks:Work Breaks`;

const routes: Routes = [
  {
    path: '',
    component: DeveloperComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'issues'
      },
      {
        path: 'issues',
        loadChildren: () => import('./issues/developer-issues.module').then(m => m.DeveloperIssuesModule)
      },
      {
        path: 'salaries',
        data: {breadcrumb: SALARIES_BREADCRUMB},
        loadChildren: () => import('./salaries/salaries.module').then(m => m.SalariesModule)
      },
      {
        path: 'breaks',
        data: {breadcrumb: WORK_BREAKS_BREADCRUMB},
        loadChildren: () => import('./breaks/developer-breaks.module').then(m => m.DeveloperBreaksModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperRoutingModule {
}
