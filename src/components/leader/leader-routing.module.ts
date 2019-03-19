import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IssuesListComponent} from '../issues/list/issues-list.component';
import {UserWithMetricsResolver} from './resolvers';
import {TeamComponent} from './team/team.component';

const routes: Routes = [
  {
    path: '',
    component: TeamComponent,
    children: [
      {
        path: ':user/issues',
        component: IssuesListComponent,
        resolve: {user: UserWithMetricsResolver}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderRoutingModule {
}
