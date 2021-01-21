import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppLayoutModule, BlockModule, LinkModule } from '@junte/ui';
import { PenaltiesModule } from '../../shared/penalties/penalties.module';
import { CompanyPenaltiesRoutingModule } from './company-penalties-routing.module';
import { CompanyPenaltiesComponent } from './company-penalties.component';

@NgModule({
  declarations: [
    CompanyPenaltiesComponent
  ],
  imports: [
    CompanyPenaltiesRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    AppLayoutModule,
    BlockModule,
    LinkModule,

    PenaltiesModule
  ]
})
export class CompanyPenaltiesModule {

}
