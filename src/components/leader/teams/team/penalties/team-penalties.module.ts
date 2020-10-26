import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { PenaltiesModule } from '../../../../shared/penalties/penalties.module';
import { TeamPenaltiesRoutingModule } from './team-penalties-routing.module';
import { TeamPenaltiesComponent } from './team-penalties.component';

@NgModule({
  declarations: [
    TeamPenaltiesComponent
  ],
  imports: [
    TeamPenaltiesRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,

    PenaltiesModule
  ]
})
export class TeamPenaltiesModule {

}
