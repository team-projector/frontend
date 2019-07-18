import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeveloperDashboardRoutingModule} from './developer-dashboard-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DeveloperDashboardComponent} from './developer-dashboard.component';
import {JunteUiModule} from 'junte-ui';
import {DatePipesModule} from 'src/pipes/date-pipes.module';
import {DueDateResolver, OpenedResolver, ProblemsResolver} from 'src/resolvers/issue';
import {UsersServiceProvider} from 'src/services/users/provider';
import {IssuesModule} from 'src/components/issues/issues.module';
import {TimeExpensesListComponent} from 'src/components/developer/dashboard/time-expenses/time-expenses-list.component';
import {IssuesListComponent} from 'src/components/developer/dashboard/issues/issues-list.component';
import {NumberModule} from '../../../pipes/number.module';
import {MeUserResolver} from '../../../resolvers/me';

@NgModule({
  declarations: [
    DeveloperDashboardComponent,
    IssuesListComponent,
    TimeExpensesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    DatePipesModule,
    DeveloperDashboardRoutingModule,
    IssuesModule,
    NumberModule
  ],
  providers: [
    MeUserResolver,
    DueDateResolver,
    UsersServiceProvider,
    OpenedResolver,
    ProblemsResolver
  ]
})
export class DeveloperDashboardModule {
}
