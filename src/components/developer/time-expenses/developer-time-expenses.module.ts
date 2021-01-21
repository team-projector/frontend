import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppLayoutModule, BlockModule } from '@junte/ui';
import { TimeExpensesListModule } from '../../shared/time-expenses/list/time-expenses-list.module';
import { DeveloperTimeExpensesRoutingModule } from './developer-time-expenses-routing.module';
import { DeveloperTimeExpensesComponent } from './developer-time-expenses.component';

@NgModule({
  declarations: [
    DeveloperTimeExpensesComponent
  ],
  imports: [
    DeveloperTimeExpensesRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    AppLayoutModule,
    BlockModule,

    TimeExpensesListModule
  ]
})
export class DeveloperTimeExpensesModule {

}
