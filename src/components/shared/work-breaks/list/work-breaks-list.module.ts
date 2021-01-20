import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MessageModule,
  InformerModule,
  FormModule,
  TableModule,
  GanttModule,
  ButtonModule,
  DatePeriodModule,
  StackModule,
  LabelModule,
  MenuModule,
  InputModule,
  DotModule, SwitcherModule, GridModule
} from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { BreakDeclineComponent } from 'src/components/shared/work-breaks/decline/break-decline.component';
import { BreakEditComponent } from 'src/components/shared/work-breaks/edit/break-edit.component';
import { UserCardModule } from '../../users/card/user-card.module';
import { WorkBreaksListComponent } from './work-breaks-list.component';


@NgModule({
  declarations: [
    BreakEditComponent,
    BreakDeclineComponent,
    WorkBreaksListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MessageModule,
    InformerModule,
    FormModule,
    TableModule,
    GanttModule,
    ButtonModule,
    DatePeriodModule,
    StackModule,
    LabelModule,
    DotModule,
    MenuModule,
    InputModule,
    GridModule,
    SwitcherModule,
    DateFnsModule,
    UserCardModule
  ],
  entryComponents: [
    BreakEditComponent,
    BreakDeclineComponent
  ],
  exports: [
    BreakEditComponent,
    BreakDeclineComponent,
    WorkBreaksListComponent
  ]
})
export class WorkBreaksListModule {

}
