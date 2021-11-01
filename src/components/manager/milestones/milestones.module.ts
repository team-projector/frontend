import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AppLayoutModule,
  BadgeModule,
  BlockModule,
  ButtonModule,
  DatePickerModule,
  DotModule,
  FormModule,
  GanttModule,
  GridModule,
  InformerModule,
  InputModule,
  LabelModule,
  LinkModule,
  MenuModule,
  PopoverModule,
  SelectModule,
  SkeletonModule,
  StackModule,
  SwitcherModule,
  TabsModule
} from '@esanum/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { EditTicketComponent } from 'src/components/manager/milestones/milestone/edit-ticket/edit-ticket.component';
import { TicketStateColorPipe } from 'src/components/manager/milestones/milestone/milestone.pipes';
import { OutletModule } from 'src/components/outlet/outlet.module';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { IssueCardModule } from '../../shared/issues/card/issue-card.module';
import { MilestonesListModule } from '../../shared/milestones/list/milestones-list.module';
import { MilestoneComponent } from './milestone/milestone.component';
import { MilestonesRoutingModule } from './milestones-routing.module';
import { ManagerMilestonesComponent } from './milestones.component';

@NgModule({
  declarations: [
    ManagerMilestonesComponent,
    MilestoneComponent,
    EditTicketComponent,
    TicketStateColorPipe
  ],
  imports: [
    MilestonesRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    AppLayoutModule,
    BlockModule,
    InformerModule,
    FormModule,
    GanttModule,
    StackModule,
    SwitcherModule,
    SkeletonModule,
    ButtonModule,
    GridModule,
    BadgeModule,
    MenuModule,
    LabelModule,
    TabsModule,
    PopoverModule,
    DotModule,
    LinkModule,
    SelectModule,
    DatePickerModule,
    InputModule,
    ArrayPipesModule,
    DragDropModule,
    ClipboardModule,

    IssueCardModule,
    DatePipesModule,
    OutletModule,
    DateFnsModule,
    MoneyPipesModule,

    MilestonesListModule
  ],
  entryComponents: [EditTicketComponent]
})
export class MilestonesModule {

}
