import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LabelModule, ProgressBarModule, StackModule } from '@junte/ui';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { WorkProgressComponent } from './work-progress.component';

@NgModule({
  imports: [
    CommonModule,
    ProgressBarModule,
    LabelModule,
    StackModule,
    MoneyPipesModule,
    DatePipesModule
  ],
  declarations: [
    WorkProgressComponent
  ],
  exports: [
    WorkProgressComponent
  ]
})
export class WorkProgressModule {

}
