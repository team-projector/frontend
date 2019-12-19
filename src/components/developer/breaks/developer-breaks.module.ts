import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from 'junte-ui';
import { BreaksModule } from 'src/components/breaks/breaks.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { NumberModule } from 'src/pipes/number.module';
import { MeUserResolver } from 'src/resolvers/me';
import { BreaksGanttComponent } from './breaks-gantt/breaks-gantt.component';
import { DeveloperBreaksRoutingModule } from './developer-breaks-routing.module';
import { DeveloperBreaksComponent } from './developer-breaks.component';
import { DeveloperBreaksListComponent } from './breaks/breaks-list.component';

@NgModule({
  declarations: [
    DeveloperBreaksComponent,
    BreaksGanttComponent,
    DeveloperBreaksListComponent,
  ],
  imports: [
    BreaksModule,
    CommonModule,
    JunteUiModule,
    DeveloperBreaksRoutingModule,
    ReactiveFormsModule,
    DatePipesModule,
    DeveloperBreaksRoutingModule,
    NumberModule
  ],
  providers: [
    MeUserResolver
  ]
})
export class DeveloperBreaksModule {
}
