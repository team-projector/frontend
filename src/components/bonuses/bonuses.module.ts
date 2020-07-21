import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { BonusesComponent } from './bonuses.component';

@NgModule({
  declarations: [
    BonusesComponent
  ],
  exports: [
    BonusesComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule
  ]
})
export class BonusesModule {
}
