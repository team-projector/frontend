import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppLayoutModule, BlockModule } from '@esanum/ui';
import { TimeExpensesListModule } from '../../../../shared/time-expenses/list/time-expenses-list.module';
import { TeamTimeExpensesRoutingModule } from './team-time-expenses-routing.module';
import { TeamTimeExpensesComponent } from './time-expenses.component';

@NgModule({
  declarations: [
    TeamTimeExpensesComponent
  ],
  imports: [
    TeamTimeExpensesRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    BlockModule,
    AppLayoutModule,

    TimeExpensesListModule
  ]
})
export class TeamTimeExpensesModule {

}
