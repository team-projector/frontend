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
        path: 'bonuses',
        loadChildren: () => import('./bonuses/developer-bonuses.module').then(m => m.DeveloperBonusesModule)
      },
      {
        path: 'penalties',
        loadChildren: () => import('./penalties/developer-penalties.module').then(m => m.DeveloperPenaltiesModule)
      },
      {
        path: 'salaries',
        loadChildren: () => import('./salaries/developer-salaries.module').then(m => m.DeveloperSalariesModule)
      },
      {
        path: 'breaks',
        loadChildren: () => import('./work-breaks/developer-breaks.module').then(m => m.DeveloperBreaksModule)
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
