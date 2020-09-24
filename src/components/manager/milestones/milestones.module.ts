import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { IssuesListModule } from 'src/components/shared/issues/list/issues-list.module';
import { EditTicketComponent } from 'src/components/manager/milestones/milestone/edit-ticket/edit-ticket.component';
import { TicketStateColorPipe } from 'src/components/manager/milestones/milestone/pipes';
import { OutletModule } from 'src/components/outlet/outlet.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { DueDateResolver, IssuesTypeResolver } from 'src/resolvers/issue';
import { MilestoneResolver } from 'src/resolvers/milestone';
import { ProjectResolver } from 'src/resolvers/project';
import { TeamResolver } from 'src/resolvers/team';
import { TicketResolver } from 'src/resolvers/ticket';
import { UserResolver } from 'src/resolvers/user';
import { MilestoneComponent } from './milestone/milestone.component';
import { MilestonesRoutingModule } from './milestones-routing.module';
import { MilestonesComponent } from './milestones.component';

@NgModule({
  declarations: [
    MilestonesComponent,
    MilestoneComponent,
    EditTicketComponent,
    TicketStateColorPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    DragDropModule,
    MilestonesRoutingModule,
    DatePipesModule,
    OutletModule,
    IssuesListModule,
    DateFnsModule
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
