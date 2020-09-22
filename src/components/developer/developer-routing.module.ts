import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperComponent } from 'src/components/developer/developer.component';

export const SALARIES_BREADCRUMB = $localize`:@@label.salaries:Salaries`;
export const WORK_BREAKS_BREADCRUMB = $localize`:@@label.work_breaks:Work Breaks`;

const routes: Routes = [
  {
    path: '',
    component: DeveloperComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/developer-dashboard.module').then(m => m.DeveloperDashboardModule)
      },
      {
        path: 'issues',
        loadChildren: () => import('./issues/developer-issues.module').then(m => m.DeveloperIssuesModule)
      },
      {
        path: 'merge-requests',
        loadChildren: () => import('./merge-requests/developer-merge-requests.module').then(m => m.DeveloperMergeRequestsModule)
      },
      {
        path: 'time-expenses',
        loadChildren: () => import('./time-expenses/developer-time-expenses.module').then(m => m.DeveloperTimeExpensesModule)
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
