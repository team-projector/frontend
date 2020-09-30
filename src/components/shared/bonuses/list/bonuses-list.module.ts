import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { MoneyPipesModule } from '../../../../pipes/money-pipes.module';
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
    ReactiveFormsModule,
    DateFnsModule,
    MoneyPipesModule
  ]
})
export class BonusesListModule {
}
