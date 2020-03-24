import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from 'junte-ui';
import { PenaltiesComponent } from './penalties.component';

@NgModule({
  declarations: [
    PenaltiesComponent
  ],
  exports: [
    PenaltiesComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule
  ]
})
export class PenaltiesModule {
}
