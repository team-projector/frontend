import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MilestoneIssuesComponent } from 'src/components/manager/milestones/milestone/issues/milestone-issues.component';
import { MilestoneComponent } from 'src/components/manager/milestones/milestone/milestone.component';
import { OutletComponent } from 'src/components/outlet/outlet.component';
import { MilestoneResolver } from 'src/resolvers/milestone';
import { TicketResolver } from 'src/resolvers/ticket';
import { MilestonesComponent } from './milestones.component';

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
    data: {breadcrumb: $localize`:@@label.milestones:Milestones`},
    children: [
      {
        path: '',
        component: MilestonesComponent
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
          },
          {
            path: ':ticket',
            component: MilestoneIssuesComponent,
            resolve: {
              ticket: TicketResolver,
            },
            data: {breadcrumb: getTicket},
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
