import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
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
    MoneyPipesModule
  ]
})
export class ProjectsListModule {

}
