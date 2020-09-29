import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DueDateResolver } from 'src/resolvers/issue';
import { MeUserResolver } from 'src/resolvers/me';
import { TeamResolver } from '../../../../../resolvers/team';
import { UserResolver } from '../../../../../resolvers/user';
import { TeamTimeExpensesComponent } from './time-expenses.component';

export const TIME_EXPENSES = $localize`:@@label.time_expenses:Time expenses`;

const routes: Routes = [
  {
    path: '',
    component: TeamTimeExpensesComponent,
    data: {breadcrumb: TIME_EXPENSES},
    resolve: {
      team: TeamResolver,
      user: UserResolver,
      date: DueDateResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamTimeExpensesRoutingModule {

}
