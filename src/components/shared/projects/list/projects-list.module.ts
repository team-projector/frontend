import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AvatarModule,
  BadgeModule,
  FormModule,
  LabelModule,
  LinkModule,
  MenuModule,
  StackModule,
  SwitcherModule,
  TableModule
} from '@junte/ui';
import { BudgetModule } from 'src/components/shared/budget/budget.module';
import { ProfitModule } from 'src/components/shared/profit/profit.module';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { ProjectsListComponent } from './projects-list.component';

@NgModule({
  declarations: [
    ProjectsListComponent
  ],
  exports: [
    ProjectsListComponent
  ],
  imports: [
    CommonModule,
    FormModule,
    TableModule,
    SwitcherModule,
    StackModule,
    AvatarModule,
    LinkModule,
    LabelModule,
    MenuModule,
    BadgeModule,
    ReactiveFormsModule,
    MoneyPipesModule,
    ProfitModule,
    BudgetModule
  ]
})
export class ProjectsListModule {

}
