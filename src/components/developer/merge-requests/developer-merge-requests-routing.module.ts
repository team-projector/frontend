import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DueDateResolver } from 'src/resolvers/issue';
import { MeUserResolver } from 'src/resolvers/me';
import { ProjectResolver } from 'src/resolvers/project';
import { DeveloperMergeRequestsComponent } from './developer-merge-requests.component';

export const MERGE_REQUESTS_BREADCRUMB = $localize`:@@label.merge_requests:Merge requests`;

const routes: Routes = [
  {
    path: '',
    component: DeveloperMergeRequestsComponent,
    data: {breadcrumb: MERGE_REQUESTS_BREADCRUMB},
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
export class DeveloperMergeRequestsRoutingModule {

}
