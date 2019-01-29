import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IssuesListComponent} from '../issues/list/issues-list.component';
import {MeUserResolver} from './resovers';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'issues'
  },
  {
    path: 'issues',
    component: IssuesListComponent,
    resolve: {user: MeUserResolver}

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeRoutingModule {
}
