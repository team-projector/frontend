import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MilestoneComponent } from 'src/components/manager/milestones/milestone/milestone.component';
import { OutletComponent } from 'src/components/outlet/outlet.component';
import { MilestoneResolver } from 'src/resolvers/milestone';
import { TicketResolver } from 'src/resolvers/ticket';
import { ManagerMilestonesComponent } from './milestones.component';

export const MILESTONES_BREADCRUMB = $localize`:@@label.milestones:Milestones`;

export function getMilestone(data: any) {
  return data.milestone.title;
}

export function getTicket(data: any) {
  return data.ticket.title;
}

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    data: {breadcrumb: MILESTONES_BREADCRUMB},
    children: [
      {
        path: '',
        component: ManagerMilestonesComponent
      },
      {
        path: ':milestone',
        component: OutletComponent,
        resolve: {
          milestone: MilestoneResolver,
        },
        data: {breadcrumb: getMilestone},
        children: [
          {
            path: '',
            component: MilestoneComponent,
            resolve: {
              milestone: MilestoneResolver,
              ticket: TicketResolver,
            }
          }
        ]
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
