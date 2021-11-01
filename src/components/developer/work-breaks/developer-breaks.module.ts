import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AppLayoutModule,
  BlockModule,
  MenuModule,
  InformerModule,
  GanttModule,
  StackModule,
  LabelModule,
  PopoverModule
} from '@esanum/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { WorkBreaksListModule } from 'src/components/shared/work-breaks/list/work-breaks-list.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { NumberPipesModule } from 'src/pipes/number-pipes.module';
import { UserCardModule } from '../../shared/users/card/user-card.module';
import { DeveloperBreaksRoutingModule } from './developer-breaks-routing.module';
import { DeveloperBreaksComponent } from './developer-breaks.component';
import { DeveloperWorkBreaksGanttComponent } from './gantt/developer-breaks-gantt.components';
import { DeveloperBreaksTableComponent } from './list/developer-breaks-table.component';

@NgModule({
  declarations: [
    DeveloperBreaksComponent,
    DeveloperBreaksTableComponent,
    DeveloperWorkBreaksGanttComponent
  ],
  imports: [
    DeveloperBreaksRoutingModule,

    CommonModule,
    WorkBreaksListModule,
    AppLayoutModule,
    BlockModule,
    MenuModule,
    InformerModule,
    GanttModule,
    StackModule,
    LabelModule,
    PopoverModule,

    ReactiveFormsModule,
    DatePipesModule,
    NumberPipesModule,
    DateFnsModule,
    UserCardModule
  ]
})
export class DeveloperBreaksModule {

}
