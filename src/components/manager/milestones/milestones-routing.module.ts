import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MilestoneComponent } from 'src/components/manager/milestones/milestone/milestone.component';
import { OutletComponent } from 'src/components/outlet/outlet.component';
import { MilestoneResolver } from 'src/resolvers/milestone';
import { MilestonesComponent } from './milestones.component';

export function getMilestone(data: any) {
  return data.milestone.title;
}

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    data: {breadcrumb: 'Milestones'},
    children: [
      {
        path: '',
        component: MilestonesComponent
      },
      {
        path: ':milestone',
        component: MilestoneComponent,
        data: {breadcrumb: getMilestone},
        resolve: {
          milestone: MilestoneResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MilestonesRoutingModule {
}
