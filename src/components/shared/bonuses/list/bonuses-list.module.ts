import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { BonusesListComponent } from './bonuses-list.component';

@NgModule({
  declarations: [
    BonusesListComponent
  ],
  exports: [
    BonusesListComponent
  ],
    imports: [
        CommonModule,
        JunteUiModule,
        ReactiveFormsModule
    ]
})
export class BonusesListModule {
}
