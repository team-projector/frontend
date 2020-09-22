import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { BonusesModule } from 'src/components/bonuses/bonuses.module';
import { SalariesRoutingModule } from 'src/components/developer/salaries/salaries-routing.module';
import { SalaryBonusesListComponent } from 'src/components/developer/salaries/salary-detail/bonuses-list/bonuses-list.component';
import { SalaryPenaltiesListComponent } from 'src/components/developer/salaries/salary-detail/penalties-list/penalties-list.component';
import { PenaltiesModule } from 'src/components/penalties/penalties.module';
import { SalariesComponent } from 'src/components/salaries/salaries.component';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { MeUserResolver } from 'src/resolvers/me';
import { SalaryResolver } from 'src/resolvers/salary';
import { IssuesModule } from '../../issues/issues.module';
import { SalariesListComponent } from './salaries-list.component';
import { SalaryDetailComponent } from './salary-detail/salary-detail.component';
import { SalaryTimeExpensesListComponent } from './salary-detail/time-expenses-list/time-expenses-list.component';

@NgModule({
  declarations: [
    SalariesComponent,
    SalariesListComponent,
    SalaryDetailComponent,
    SalaryBonusesListComponent,
    SalaryPenaltiesListComponent,
    SalaryTimeExpensesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    SalariesRoutingModule,
    DatePipesModule,
    IssuesModule,
    BonusesModule,
    PenaltiesModule
  ],
  exports: [
    SalariesComponent,
    SalariesListComponent,
    SalaryDetailComponent
  ],
  providers: [
    SalaryResolver,
    MeUserResolver
  ]
})
export class SalariesModule {

}
