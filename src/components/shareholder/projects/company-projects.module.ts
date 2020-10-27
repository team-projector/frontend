import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { ProjectsListModule } from '../../shared/projects/list/projects-list.module';
import { CompanyProjectsRoutingModule } from './company-projects-routing.module';
import { CompanyProjectsComponent } from './company-projects.component';

@NgModule({
  declarations: [
    CompanyProjectsComponent
  ],
  imports: [
    CompanyProjectsRoutingModule,

    CommonModule,
    JunteUiModule,
    ProjectsListModule
  ]
})
export class CompanyProjectsModule {

}
