import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareholderComponent } from './shareholder.component';

const routes: Routes = [
  {
    path: '',
    component: ShareholderComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'salaries'
      },
      {
        path: 'users',
        loadChildren: () => import('./users/company-users.module').then(m => m.CompanyUsersModule)
      },
      {
        path: 'projects',
        loadChildren: () => import('./projects/company-projects.module').then(m => m.CompanyProjectsModule)
      },
      {
        path: 'bonuses',
        loadChildren: () => import('./bonuses/company-bonuses.module').then(m => m.CompanyBonusesModule)
      },
      {
        path: 'penalties',
        loadChildren: () => import('./penalties/company-penalties.module').then(m => m.CompanyPenaltiesModule)
      },
      {
        path: 'salaries',
        loadChildren: () => import('./salaries/company-salaries.module').then(m => m.CompanySalariesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareholderRoutingModule {

}
