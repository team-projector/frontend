import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyProjectGroupsComponent } from './groups/company-project-groups.component';
import { CompanyProjectsComponent } from './projects/company-projects.component';
import { ShareholderProjectsComponent } from './shareholder-projects.component';

export const PROJECTS_BREADCRUMB = $localize`:@@label.projects:Projects`;
export const PROJECT_GROUPS_BREADCRUMB = $localize`:@@label.project_groups:Project Groups`;

const routes: Routes = [
  {
    path: '',
    component: ShareholderProjectsComponent,
    children: [
      {
        path: '',
        data: {breadcrumb: PROJECTS_BREADCRUMB},
        component: CompanyProjectsComponent
      },
      {
        path: 'groups',
        data: {breadcrumb: PROJECT_GROUPS_BREADCRUMB},
        component: CompanyProjectGroupsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareholderProjectsRoutingModule {

}
