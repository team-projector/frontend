import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { MoneyPipesModule } from '../../../../pipes/money-pipes.module';
import { ProjectsListComponent } from './projects-list.component';

@NgModule({
  declarations: [
    ProjectsListComponent
  ],
  exports: [
    ProjectsListComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule,
    ReactiveFormsModule,
    DateFnsModule,
    MoneyPipesModule
  ]
})
export class ProjectsListModule {

}
