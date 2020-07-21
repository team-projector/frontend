import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { SalaryDetailWidgetComponent } from './salary-detail-widget.component';

@NgModule({
  declarations: [
    SalaryDetailWidgetComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    DatePipesModule
  ],
  exports: [
    SalaryDetailWidgetComponent
  ]
})
export class SalaryDetailWidgetModule {
}
