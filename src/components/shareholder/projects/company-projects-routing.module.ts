import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutletComponent } from '../../outlet/outlet.component';
import { CompanyProjectsComponent } from './company-projects.component';

export const PROJECTS_BREADCRUMB = $localize`:@@label.projects:Projects`;

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    data: {breadcrumb: PROJECTS_BREADCRUMB},
    children: [
      {
        path: '',
        component: CompanyProjectsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyProjectsRoutingModule {

}
