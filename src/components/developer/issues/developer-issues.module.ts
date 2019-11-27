import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from 'junte-ui';
import { DeveloperMergeRequestsListComponent } from 'src/components/developer/issues/merge-requests-list/merge-requests-list.component';
import { DueDateModule } from 'src/components/due-date/due-date.module';
import { IssuesModule } from 'src/components/issues/issues.module';
import { MetricsTypeModule } from 'src/components/metrics-type/metrics-type.module';
import { CurrencyRublePipeModule } from 'src/pipes/currency-ruble.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { NumberModule } from 'src/pipes/number.module';
import { DueDateResolver, IssuesTypeResolver } from 'src/resolvers/issue';
import { MeUserResolver } from 'src/resolvers/me';
import { MergeRequestStateResolver } from 'src/resolvers/merge-request';
import { ProjectResolver } from 'src/resolvers/project';
import { DeveloperIssuesRoutingModule } from './developer-issues-routing.module';
import { DeveloperIssuesComponent } from './developer-issues.component';
import { DeveloperIssuesListComponent } from './issues-list/issues-list.component';
import { TimeExpensesListComponent } from './time-expenses-list/time-expenses-list.component';

@NgModule({
  declarations: [
    DeveloperIssuesComponent,
    DeveloperIssuesListComponent,
    TimeExpensesListComponent,
    DeveloperMergeRequestsListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    DatePipesModule,
    DeveloperIssuesRoutingModule,
    MetricsTypeModule,
    IssuesModule,
    NumberModule,
    CurrencyRublePipeModule,
    DueDateModule
  ],
  providers: [
    MeUserResolver,
    ProjectResolver,
    DueDateResolver,
    IssuesTypeResolver,
    MergeRequestStateResolver
  ]
})
export class DeveloperIssuesModule {
}
