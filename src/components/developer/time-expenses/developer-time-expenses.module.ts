import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { IssuesModule } from 'src/components/issues/issues.module';
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
    JunteUiModule,

    IssuesModule
  ]
})
export class DeveloperTimeExpensesModule {

}
