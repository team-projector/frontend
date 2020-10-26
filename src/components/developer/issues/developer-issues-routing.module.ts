import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperIssuesComponent } from 'src/components/developer/issues/developer-issues.component';
import { DueDateResolver } from 'src/resolvers/issue';
import { MeUserResolver } from 'src/resolvers/me';
import { ProjectResolver } from 'src/resolvers/project';

export const ISSUES_BREADCRUMB = $localize`:@@label.issues:Issues`;

const routes: Routes = [
  {
    path: '',
    component: DeveloperIssuesComponent,
    data: {breadcrumb: ISSUES_BREADCRUMB},
    resolve: {
      user: MeUserResolver,
      dueDate: DueDateResolver,
      project: ProjectResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperIssuesRoutingModule {

}
