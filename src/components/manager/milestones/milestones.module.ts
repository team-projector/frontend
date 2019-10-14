import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from 'junte-ui';
import { IssuesModule } from 'src/components/issues/issues.module';
import { EditTicketComponent } from 'src/components/manager/milestones/milestone/milestone-tickets/edit-ticket/edit-ticket.component';
import { OutletModule } from 'src/components/outlet/outlet.module';
import { CurrencyRublePipeModule } from 'src/pipes/currency-ruble.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { DueDateResolver, IssuesTypeResolver } from 'src/resolvers/issue';
import { MilestoneResolver } from 'src/resolvers/milestone';
import { ProjectResolver } from 'src/resolvers/project';
import { TeamResolver } from 'src/resolvers/team';
import { TicketResolver } from 'src/resolvers/ticket';
import { UserResolver } from 'src/resolvers/user';
import { MilestoneIssuesComponent } from './milestone/milestone-issues/milestone-issues.component';
import { MilestoneTicketsComponent } from './milestone/milestone-tickets/milestone-tickets.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { MilestonesRoutingModule } from './milestones-routing.module';
import { MilestonesComponent } from './milestones.component';

@NgModule({
  declarations: [
    MilestonesComponent,
    MilestoneComponent,
    MilestoneIssuesComponent,
    MilestoneTicketsComponent,
    EditTicketComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    MilestonesRoutingModule,
    DatePipesModule,
    CurrencyRublePipeModule,
    OutletModule,
    IssuesModule
  ],
  entryComponents: [EditTicketComponent],
  providers: [
    TeamResolver,
    MilestoneResolver,
    TicketResolver,
    TeamResolver,
    UserResolver,
    ProjectResolver,
    DueDateResolver,
    IssuesTypeResolver
  ]
})
export class MilestonesModule {

}
