import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletComponent } from '../../outlet/outlet.component';
import { CompanySalariesComponent } from './company-salaries.component';

export const SALARIES_BREADCRUMB = $localize`:@@label.salaries:Salaries`;

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    data: {breadcrumb: SALARIES_BREADCRUMB},
    children: [
      {
        path: '',
        component: CompanySalariesComponent
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
export class CompanySalariesRoutingModule {

}
