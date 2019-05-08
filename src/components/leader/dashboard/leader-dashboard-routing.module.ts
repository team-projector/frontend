import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DueDateResolver } from 'src/resolvers/due-date';
import { UserWithMetricsResolver } from 'src/resolvers/user';
import { IssueProblemsComponent } from 'src/components/issues/problems/issue-problems.component';
import { LeaderDashboardComponent } from 'src/components/leader/dashboard/leader-dashboard.component';
import { IssuesListComponent } from 'src/components/developer/dashboard/issues/issues-list.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderDashboardComponent,
    resolve: {user: UserWithMetricsResolver, dueDate: DueDateResolver},
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'issues'
      },
      {
        path: 'issues',
        component: IssuesListComponent,
        resolve: {user: UserWithMetricsResolver, dueDate: DueDateResolver}
      },
      {
        path: 'problems',
        component: IssueProblemsComponent,
        resolve: {user: UserWithMetricsResolver}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderDashboardRoutingModule {
}
