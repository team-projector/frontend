import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { MoneyPipesModule } from '../../../../pipes/money-pipes.module';
import { ProjectGroupsListComponent } from './project-groups-list.component';

@NgModule({
  declarations: [
    ProjectGroupsListComponent
  ],
  exports: [
    ProjectGroupsListComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule,
    ReactiveFormsModule,
    MoneyPipesModule
  ]
})
export class ProjectGroupsListModule {

}
