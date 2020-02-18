import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalariesListComponent } from './salaries-list.component';
import { SalaryDetailComponent } from './salary-detail/salary-detail.component';
import { SalaryResolver } from 'src/resolvers/salary';
import { MeUserResolver } from '../../../resolvers/me';

export const SALARY_BREADCRUMB = $localize`:@@label.salary:Salary Detail`;

const routes: Routes = [
  {
    path: '',
    component: SalariesListComponent,
    resolve: {user: MeUserResolver},
  },
  {
    path: ':salary',
    data: {breadcrumb: SALARY_BREADCRUMB},
    component: SalaryDetailComponent,
    resolve: {salary: SalaryResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalariesRoutingModule {
}
