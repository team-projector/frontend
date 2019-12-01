import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule, UI } from 'junte-ui';
import { BreaksModule } from 'src/components/breaks/breaks.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { NumberModule } from 'src/pipes/number.module';
import { BreaksTypeResolver } from 'src/resolvers/break';
import { MeUserResolver } from 'src/resolvers/me';
import { DeveloperBreaksRoutingModule } from './developer-breaks-routing.module';
import { DeveloperBreaksComponent } from './developer-breaks.component';
import { BreaksListComponent } from './breaks-list/breaks-list.component';
import { BreaksGantComponent } from './breaks-gant/breaks-gant.component';
import { BreakEditComponent } from './break-edit/break-edit.component';



@NgModule({
  declarations: [
    DeveloperBreaksComponent,
    BreaksListComponent,
    BreaksGantComponent,
    BreakEditComponent],
  imports: [
    CommonModule,
    JunteUiModule,
    DeveloperBreaksRoutingModule,
    ReactiveFormsModule,
    DatePipesModule,
    DeveloperBreaksRoutingModule,
    BreaksModule,
    NumberModule,

  ],
  entryComponents: [
    BreakEditComponent
  ],
  providers: [
    MeUserResolver,
    BreaksTypeResolver
  ],
})
export class DeveloperBreaksModule {
}
