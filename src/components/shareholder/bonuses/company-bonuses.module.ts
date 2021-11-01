import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppLayoutModule, BlockModule } from '@esanum/ui';
import { BonusesListModule } from '../../shared/bonuses/list/bonuses-list.module';
import { CompanyBonusesRoutingModule } from './company-bonuses-routing.module';
import { CompanyBonusesComponent } from './company-bonuses.component';

@NgModule({
  declarations: [
    CompanyBonusesComponent
  ],
  imports: [
    CompanyBonusesRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    AppLayoutModule,
    BlockModule,

    BonusesListModule
  ]
})
export class CompanyBonusesModule {

}
