import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppLayoutModule, BlockModule } from '@esanum/ui';
import { BonusesListModule } from '../../../../shared/bonuses/list/bonuses-list.module';
import { TeamBonusesRoutingModule } from './team-bonuses-routing.module';
import { TeamBonusesComponent } from './team-bonuses.component';

@NgModule({
  declarations: [
    TeamBonusesComponent
  ],
  imports: [
    TeamBonusesRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    AppLayoutModule,
    BlockModule,

    BonusesListModule
  ]
})
export class TeamBonusesModule {

}
