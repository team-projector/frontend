import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectResolver } from 'src/resolvers/project';
import { TeamResolver } from 'src/resolvers/team';
import { UserResolver } from 'src/resolvers/user';
import { Team } from '../../../../models/team';
import { TeamComponent } from './team.component';

export function getTeam({team}: { team: Team }) {
  return team.title;
}

const routes: Routes = [
  {
    path: '',
    component: TeamComponent,
    data: {breadcrumb: getTeam},
    resolve: {
      team: TeamResolver
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/team-dashboard.module').then(m => m.TeamDashboardModule)
      },
      {
        path: 'issues',
        loadChildren: () => import('./issues/team-issues.module').then(m => m.TeamIssuesModule)
      },
      {
        path: 'merge-requests',
        loadChildren: () => import('./merge-requests/team-merge-requests.module').then(m => m.TeamMergeRequestsModule)
      },
      {
        path: 'time-expenses',
        loadChildren: () => import('./time-expenses/team-time-expenses.module').then(m => m.TeamTimeExpensesModule)
      },
      {
        path: 'bonuses',
        loadChildren: () => import('./bonuses/team-bonuses.module').then(m => m.TeamBonusesModule)
      },
      {
        path: 'penalties',
        loadChildren: () => import('./penalties/team-penalties.module').then(m => m.TeamPenaltiesModule)
      },
      {
        path: 'salaries',
        loadChildren: () => import('./salaries/team-salaries.module').then(m => m.TeamSalariesModule)
      },
      {
        path: 'breaks',
        loadChildren: () => import('./work-breaks/team-breaks.module').then(m => m.TeamBreaksModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule {

}
