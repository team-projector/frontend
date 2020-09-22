import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DueDateResolver } from 'src/resolvers/issue';
import { MeUserResolver } from 'src/resolvers/me';
import { DeveloperTimeExpensesComponent } from './developer-time-expenses.component';

export const TIME_EXPENSES = $localize`:@@label.time_expenses:Time expenses`;

const routes: Routes = [
  {
    path: '',
    component: DeveloperTimeExpensesComponent,
    data: {breadcrumb: TIME_EXPENSES},
    resolve: {
      user: MeUserResolver,
      dueDate: DueDateResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperTimeExpensesRoutingModule {

}
