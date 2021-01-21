import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppLayoutModule, BlockModule } from '@junte/ui';
import { BonusesListModule } from '../../shared/bonuses/list/bonuses-list.module';
import { DeveloperBonusesRoutingModule } from './developer-bonuses-routing.module';
import { DeveloperBonusesComponent } from './developer-bonuses.component';

@NgModule({
  declarations: [
    DeveloperBonusesComponent
  ],
  imports: [
    DeveloperBonusesRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    AppLayoutModule,
    BlockModule,

    BonusesListModule
  ]
})
export class DeveloperBonusesModule {

}
