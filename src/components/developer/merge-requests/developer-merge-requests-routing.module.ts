import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeUserResolver } from 'src/resolvers/me';
import { TeamResolver } from '../../../resolvers/team';
import { DeveloperMergeRequestsComponent } from './developer-merge-requests.component';

export const MERGE_REQUESTS_BREADCRUMB = $localize`:@@label.merge_requests:Merge requests`;

const routes: Routes = [
  {
    path: '',
    component: DeveloperMergeRequestsComponent,
    data: {breadcrumb: MERGE_REQUESTS_BREADCRUMB},
    resolve: {
      user: MeUserResolver,
      team: TeamResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperMergeRequestsRoutingModule {

}
