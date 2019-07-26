import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeveloperIssuesRoutingModule} from './developer-issues-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DeveloperIssuesComponent} from './developer-issues.component';
import {JunteUiModule} from 'junte-ui';
import {DatePipesModule} from 'src/pipes/date-pipes.module';
import {DueDateResolver, OpenedResolver, ProblemsResolver} from 'src/resolvers/issue';
import {IssuesModule} from 'src/components/issues/issues.module';
import {NumberModule} from '../../../pipes/number.module';
import {MeUserResolver} from '../../../resolvers/me';
import {IssuesListComponent} from './issues-list/issues-list.component';
import {TimeExpensesListComponent} from './time-expenses-list/time-expenses-list.component';
import {ProjectResolver} from '../../../resolvers/project';

@NgModule({
  declarations: [
    DeveloperIssuesComponent,
    IssuesListComponent,
    TimeExpensesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    DatePipesModule,
    DeveloperIssuesRoutingModule,
    IssuesModule,
    NumberModule
  ],
  providers: [
    MeUserResolver,
    ProjectResolver,
    DueDateResolver,
    OpenedResolver,
    ProblemsResolver
  ]
})
export class DeveloperIssuesModule {
}
