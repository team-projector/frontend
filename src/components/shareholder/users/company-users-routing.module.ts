import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletComponent } from '../../outlet/outlet.component';
import { CompanyUsersComponent } from './company-users.component';

export const USERS_BREADCRUMB = $localize`:@@label.developers:Developers`;

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    data: {breadcrumb: USERS_BREADCRUMB},
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
