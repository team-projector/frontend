import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { PenaltiesListComponent } from './penalties-list.component';

@NgModule({
  declarations: [
    PenaltiesListComponent
  ],
  exports: [
    PenaltiesListComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule
  ]
})
export class PenaltiesModule {
}
