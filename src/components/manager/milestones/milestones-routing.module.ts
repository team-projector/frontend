import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MilestoneIssuesComponent } from 'src/components/manager/milestones/milestone/issues/milestone-issues.component';
import { MilestoneComponent } from 'src/components/manager/milestones/milestone/milestone.component';
import { OutletComponent } from 'src/components/outlet/outlet.component';
import { IssuesTypeResolver } from 'src/resolvers/issue';
import { MilestoneResolver } from 'src/resolvers/milestone';
import { TeamResolver } from 'src/resolvers/team';
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
    data: {breadcrumb: 'Milestones'},
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
              type: IssuesTypeResolver,
              ticket: TicketResolver,
              team: TeamResolver
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
