import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderComponent } from 'src/components/leader/leader.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'teams'
      },
      {
        path: 'teams',
        loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule)
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
