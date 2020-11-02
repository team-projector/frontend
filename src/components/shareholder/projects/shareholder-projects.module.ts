import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { WorkBreaksListModule } from 'src/components/shared/work-breaks/list/work-breaks-list.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { NumberPipesModule } from 'src/pipes/number-pipes.module';
import { ProjectGroupsListModule } from '../../shared/project-groups/list/project-groups-list.module';
import { ProjectsListModule } from '../../shared/projects/list/projects-list.module';
import { CompanyProjectGroupsComponent } from './groups/company-project-groups.component';
import { CompanyProjectsComponent } from './projects/company-projects.component';
import { ShareholderProjectsRoutingModule } from './shareholder-projects-routing.module';
import { ShareholderProjectsComponent } from './shareholder-projects.component';

@NgModule({
  declarations: [
    ShareholderProjectsComponent,
    CompanyProjectsComponent,
    CompanyProjectGroupsComponent
  ],
  imports: [
    ShareholderProjectsRoutingModule,

    CommonModule,
    ProjectsListModule,
    ProjectGroupsListModule,
    JunteUiModule,

    ReactiveFormsModule,
    DatePipesModule,
    NumberPipesModule,
    DateFnsModule
  ]
})
export class ShareholderProjectsModule {

}
