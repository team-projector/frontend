import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { BonusesListModule } from 'src/components/shared/bonuses/list/bonuses-list.module';
import { PenaltiesModule } from 'src/components/shared/penalties/penalties.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { IssuesListModule } from '../../shared/issues/list/issues-list.module';
import { TimeExpensesListModule } from '../../shared/time-expenses/list/time-expenses-list.module';
import { SalaryBonusesListComponent } from './bonuses-list/bonuses-list.component';
import { SalaryPenaltiesListComponent } from './penalties-list/penalties-list.component';
import { SalaryDetailRoutingModule } from './salary-detail-routing.module';
import { SalaryDetailComponent } from './salary-detail.component';
import { SalaryTimeExpensesListComponent } from './time-expenses-list/time-expenses-list.component';

@NgModule({
  declarations: [
    SalaryDetailComponent,
    SalaryTimeExpensesListComponent,
    SalaryBonusesListComponent,
    SalaryPenaltiesListComponent
  ],
  imports: [
    SalaryDetailRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    DatePipesModule,
    IssuesListModule,
    TimeExpensesListModule,
    BonusesListModule,
    PenaltiesModule
  ]
})
export class SalaryDetailModule {

}
