import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreaksGantComponent } from 'src/components/developer/breaks/breaks-gant/breaks-gant.component';
import { DeveloperBreaksComponent } from './developer-breaks.component';
import { BreaksListComponent } from 'src/components/developer/breaks/breaks-list/breaks-list.component';
import { MeUserResolver } from 'src/resolvers/me';

const routes: Routes = [
  {
    path: '',
    component: DeveloperBreaksComponent,
    resolve: {
      user: MeUserResolver
    },
    children: [
      {
        path: '',
        data: {breadcrumb: 'Breaks'},
        component: BreaksListComponent,
      },
      {
        path: 'gant',
        data: {breadcrumb: 'Gant'},
        component: BreaksGantComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperBreaksRoutingModule {
}
