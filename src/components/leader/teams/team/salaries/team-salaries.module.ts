import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppLayoutModule, BlockModule } from '@junte/ui';
import { SalariesListModule } from '../../../../shared/salaries/list/salaries-list.module';
import { TeamSalariesRoutingModule } from './team-salaries-routing.module';
import { TeamSalariesComponent } from './team-salaries.component';

@NgModule({
  declarations: [
    TeamSalariesComponent
  ],
  imports: [
    TeamSalariesRoutingModule,

    CommonModule,
    AppLayoutModule,
    BlockModule,
    SalariesListModule
  ]
})
export class TeamSalariesModule {

}
