import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from 'junte-ui';
import { DateFnsModule } from 'ngx-date-fns';
import { DeveloperMergeRequestsListComponent } from 'src/components/developer/issues/merge-requests-list/merge-requests-list.component';
import { DueDateModule } from 'src/components/due-date/due-date.module';
import { IssuesModule } from 'src/components/issues/issues.module';
import { MetricsTypeModule } from 'src/components/metrics-type/metrics-type.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { NumberModule } from 'src/pipes/number.module';
import { DueDateResolver, IssuesTypeResolver } from 'src/resolvers/issue';
import { MeUserResolver } from 'src/resolvers/me';
import { MergeRequestStateResolver } from 'src/resolvers/merge-request';
import { ProjectResolver } from 'src/resolvers/project';
import { DeveloperIssuesRoutingModule } from './developer-issues-routing.module';
import { DeveloperIssuesComponent } from './developer-issues.component';
import { DeveloperIssuesListComponent } from './issues-list/issues-list.component';
import { DeveloperTimeExpensesListComponent } from './time-expenses-list/time-expenses-list.component';

@NgModule({
  declarations: [
    DeveloperIssuesComponent,
    DeveloperIssuesListComponent,
    DeveloperTimeExpensesListComponent,
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
    DueDateModule,
    DateFnsModule
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
