import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProblemsListComponent } from 'src/components/developer/dashboard/problems/problems-list.component';
import { TimeExpensesListComponent } from 'src/components/developer/dashboard/time-expenses/time-expenses-list.component';
import { IssuesModule } from 'src/components/issues/issues.module';
import { IssuesListComponent } from 'src/components/developer/dashboard/issues/issues-list.component';


@NgModule({
  declarations: [
    IssuesListComponent,
    ProblemsListComponent,
    TimeExpensesListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IssuesModule
  ],
  exports: [
    IssuesListComponent,
    ProblemsListComponent,
    TimeExpensesListComponent
  ]
})
export class IssuesListsModule {
}
