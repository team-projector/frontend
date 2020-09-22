import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { BreaksModule } from 'src/components/breaks/breaks.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { NumberPipesModule } from 'src/pipes/number-pipes.module';
import { MeUserResolver } from 'src/resolvers/me';
import { DeveloperBreaksListGanttComponent } from './breaks-list-gantt/breaks-list-gantt.component';
import { DeveloperBreaksListTableComponent } from './breaks-list-table/breaks-list-table.component';
import { DeveloperBreaksRoutingModule } from './developer-breaks-routing.module';
import { DeveloperBreaksComponent } from './developer-breaks.component';

@NgModule({
  declarations: [
    DeveloperBreaksComponent,
    DeveloperBreaksListGanttComponent,
    DeveloperBreaksListTableComponent,
  ],
  imports: [
    BreaksModule,
    CommonModule,
    JunteUiModule,
    DeveloperBreaksRoutingModule,
    ReactiveFormsModule,
    DatePipesModule,
    NumberPipesModule
  ],
  providers: [
    MeUserResolver
  ]
})
export class DeveloperBreaksModule {
}
