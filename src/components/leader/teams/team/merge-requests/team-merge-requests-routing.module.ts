import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamResolver } from 'src/resolvers/team';
import { TeamMergeRequestsComponent } from './team-merge-requests.component';

export const MERGE_REQUESTS_BREADCRUMB = $localize`:@@label.merge_requests:Merge requests`;

const routes: Routes = [
  {
    path: '',
    component: TeamMergeRequestsComponent,
    data: {breadcrumb: MERGE_REQUESTS_BREADCRUMB},
    resolve: {
      team: TeamResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamMergeRequestsRoutingModule {

}
