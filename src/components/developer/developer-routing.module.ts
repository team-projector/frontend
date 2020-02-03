import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperComponent } from 'src/components/developer/developer.component';

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
        data: {breadcrumb: $localize`:@@label.salaries:Salaries`},
        loadChildren: () => import('./salaries/salaries.module').then(m => m.SalariesModule)
      },
      {
        path: 'breaks',
        data: {breadcrumb: $localize`:@@label.work_breaks:Work Breaks`},
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
