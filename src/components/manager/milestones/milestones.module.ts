import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MilestonesRoutingModule } from './milestones-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MilestonesComponent } from './milestones.component';
import { JunteUiModule } from 'junte-ui';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { CurrencyRublePipeModule } from 'src/pipes/currency-ruble.module';

@NgModule({
  declarations: [
    MilestonesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    MilestonesRoutingModule,
    DatePipesModule,
    CurrencyRublePipeModule
  ]
})
export class MilestonesModule {

}
