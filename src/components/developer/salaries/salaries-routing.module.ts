import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalariesListComponent } from './salaries-list.component';
import { SalaryDetailComponent } from './salary-detail/salary-detail.component';
import { SalaryResolver } from 'src/resolvers/salary';
import { UserWithMetricsResolver } from 'src/resolvers/user';

const routes: Routes = [
  {
    path: '',
    component: SalariesListComponent,
    resolve: {user: UserWithMetricsResolver},
  },
  {
    path: ':salary',
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
