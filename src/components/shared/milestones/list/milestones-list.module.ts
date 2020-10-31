import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { DatePipesModule } from '../../../../pipes/date-pipes.module';
import { MoneyPipesModule } from '../../../../pipes/money-pipes.module';
import { MilestonesListComponent } from './milestones-list.component';

@NgModule({
  declarations: [
    MilestonesListComponent
  ],
  exports: [
    MilestonesListComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule,
    ReactiveFormsModule,
    DateFnsModule,
    MoneyPipesModule,
    DatePipesModule
  ]
})
export class MilestonesListModule {

}
