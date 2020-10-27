import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletComponent } from '../../outlet/outlet.component';
import { CompanyUsersComponent } from './company-users.component';

export const PROJECTS_BREADCRUMB = $localize`:@@label.salaries:Salaries`;

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    data: {breadcrumb: PROJECTS_BREADCRUMB},
    children: [
      {
        path: '',
        component: CompanyUsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyUsersRoutingModule {

}
