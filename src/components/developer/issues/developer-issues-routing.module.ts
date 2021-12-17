import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperIssuesComponent } from 'src/components/developer/issues/developer-issues.component';
import { DueDateResolver } from 'src/resolvers/issue';
import { MeUserResolver } from 'src/resolvers/me';
import { ProjectResolver } from 'src/resolvers/project';
import { DeveloperIssuesListComponent } from './list/developer-issues-list.component';
import { DeveloperIssuesCalendarComponent } from './calendar/developer-issues-calendar.component';

export const ISSUES_BREADCRUMB = $localize`:@@label.issues:Issues`;

const routes: Routes = [
  {
    path: '',
    component: DeveloperIssuesComponent,
    children: [
      {
        path: '',
        data: {breadcrumb: ISSUES_BREADCRUMB},
        component: DeveloperIssuesListComponent,
        resolve: {
          user: MeUserResolver,
          dueDate: DueDateResolver,
          project: ProjectResolver
        }
      },
      {
        path: 'calendar',
        data: {breadcrumb: 'Calendar'},
        component: DeveloperIssuesCalendarComponent,
        resolve: {
          user: MeUserResolver
        }
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
