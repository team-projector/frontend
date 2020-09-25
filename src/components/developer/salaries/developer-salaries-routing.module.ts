import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { format } from 'date-fns';
import { MeUserResolver } from 'src/resolvers/me';
import { Salary } from '../../../models/salary';
import { DeveloperSalariesComponent } from './developer-salaries.component';

export function getSalary({salary}: { salary: Salary }) {
  return format(salary.createdAt, 'PPp');
}

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperSalariesRoutingModule {

}
