import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { BudgetModule } from 'src/components/shared/budget/budget.module';
import { ProfitModule } from 'src/components/shared/profit/profit.module';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { ProjectGroupsListComponent } from './project-groups-list.component';

@NgModule({
  declarations: [
    ProjectGroupsListComponent
  ],
  exports: [
    ProjectGroupsListComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule,
    ReactiveFormsModule,
    MoneyPipesModule,
    ProfitModule,
    BudgetModule
  ]
})
export class ProjectGroupsListModule {

}
