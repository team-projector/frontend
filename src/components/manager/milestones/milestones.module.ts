import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { EditTicketComponent } from 'src/components/manager/milestones/milestone/edit-ticket/edit-ticket.component';
import { TicketStateColorPipe } from 'src/components/manager/milestones/milestone/pipes';
import { OutletModule } from 'src/components/outlet/outlet.module';
import { IssuesListModule } from 'src/components/shared/issues/list/issues-list.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { IssueCardModule } from '../../shared/issues/card/issue-card.module';
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

    IssueCardModule,
    MilestonesRoutingModule,
    DatePipesModule,
    OutletModule,
    IssuesListModule,
    DateFnsModule
  ],
  entryComponents: [EditTicketComponent]
})
export class MilestonesModule {

}
