import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DueDateResolver } from 'src/resolvers/issue';
import { ProjectResolver } from 'src/resolvers/project';
import { TeamResolver } from '../../../../../resolvers/team';
import { UserResolver } from '../../../../../resolvers/user';
import { TeamIssuesComponent } from './team-issues.component';

export const ISSUES_BREADCRUMB = $localize`:@@label.issues:Issues`;

const routes: Routes = [
  {
    path: '',
    component: TeamIssuesComponent,
    data: {breadcrumb: ISSUES_BREADCRUMB},
    resolve: {
      team: TeamResolver,
      developer: UserResolver,
      project: ProjectResolver,
      dueDate: DueDateResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamIssuesRoutingModule {

}
