import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeUserResolver } from 'src/resolvers/me';
import { OutletComponent } from '../../outlet/outlet.component';
import { DeveloperSalariesComponent } from './developer-salaries.component';

export const SALARIES_BREADCRUMB = $localize`:@@label.salaries:Salaries`;

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    data: {breadcrumb: SALARIES_BREADCRUMB},
    children: [
      {
        path: '',
        component: DeveloperSalariesComponent,
        resolve: {
          user: MeUserResolver
        }
      },
      {
        path: ':salary',
        loadChildren: () => import('../../shared/salaries/detail/salary-detail.module')
          .then(m => m.SalaryDetailModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperSalariesRoutingModule {

}
