import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from 'junte-ui';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { NumberModule } from 'src/pipes/number.module';
import { BreaksTypeResolver } from 'src/resolvers/break';
import { MeUserResolver } from 'src/resolvers/me';
import { BreakEditComponent } from './break-edit/break-edit.component';
import { BreaksGanttComponent } from './breaks-gantt/breaks-gantt.component';
import { BreaksListComponent } from './breaks-list/breaks-list.component';
import { DeveloperBreaksRoutingModule } from './developer-breaks-routing.module';
import { DeveloperBreaksComponent } from './developer-breaks.component';

@NgModule({
  declarations: [
    DeveloperBreaksComponent,
    BreaksListComponent,
    BreaksGanttComponent,
    BreakEditComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule,
    DeveloperBreaksRoutingModule,
    ReactiveFormsModule,
    DatePipesModule,
    DeveloperBreaksRoutingModule,
    NumberModule
  ],
  entryComponents: [
    BreakEditComponent
  ],
  providers: [
    MeUserResolver,
    BreaksTypeResolver
  ]
})
export class DeveloperBreaksModule {
}
