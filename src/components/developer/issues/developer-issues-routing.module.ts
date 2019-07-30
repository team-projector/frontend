import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DueDateResolver, OpenedResolver, ProblemsResolver } from 'src/resolvers/issue';
import { MeUserResolver } from 'src/resolvers/me';
import { ProjectResolver } from 'src/resolvers/project';
import { DeveloperIssuesComponent } from './developer-issues.component';
import { IssuesListComponent } from './issues-list/issues-list.component';
import { TimeExpensesListComponent } from './time-expenses-list/time-expenses-list.component';

const routes: Routes = [
  {
    path: '',
    component: DeveloperIssuesComponent,
    resolve: {user: MeUserResolver, dueDate: DueDateResolver},
    children: [
      {
        path: '',
        data: {breadcrumb: 'Issues'},
        component: IssuesListComponent,
        resolve: {
          project: ProjectResolver,
          opened: OpenedResolver,
          problems: ProblemsResolver
        }
      },
      {
        path: 'time-expenses',
        data: {breadcrumb: 'Time Expenses'},
        component: TimeExpensesListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperIssuesRoutingModule {
}
