import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryDetailWidgetComponent } from './salary-detail-widget.component';
import { JunteUiModule } from 'junte-ui';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { CurrencyRublePipeModule } from 'src/pipes/currency-ruble.module';

@NgModule({
  declarations: [
    SalaryDetailWidgetComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule,
    DatePipesModule,
    CurrencyRublePipeModule
  ],
  exports: [
    SalaryDetailWidgetComponent
  ]
})
export class SalaryDetailWidgetModule {
}
