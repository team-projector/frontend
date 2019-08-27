import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeveloperIssuesRoutingModule } from './developer-issues-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DeveloperIssuesComponent } from './developer-issues.component';
import { JunteUiModule } from 'junte-ui';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { DueDateResolver, IssuesTypeResolver } from 'src/resolvers/issue';
import { IssuesModule } from 'src/components/issues/issues.module';
import { NumberModule } from 'src/pipes/number.module';
import { MeUserResolver } from 'src/resolvers/me';
import { IssuesListComponent } from './issues-list/issues-list.component';
import { TimeExpensesListComponent } from './time-expenses-list/time-expenses-list.component';
import { ProjectResolver } from 'src/resolvers/project';
import { MetricsTypeModule } from 'src/components/metrics-type/metrics-type.module';
import { DeveloperMergeRequestsListComponent } from 'src/components/developer/issues/merge-requests-list/merge-requests-list.component';
import { MergeRequestStateResolver } from 'src/resolvers/merge-request';

@NgModule({
  declarations: [
    DeveloperIssuesComponent,
    IssuesListComponent,
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
    NumberModule
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
