import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from 'junte-ui';
import { SalariesRoutingModule } from 'src/components/developer/salaries/salaries-routing.module';
import { SalariesComponent } from 'src/components/salaries/salaries/salaries.component';
import { SalaryDetailWidgetModule } from 'src/components/salaries/salary-detail-widget/salary-detail-widget.module';
import { SalaryMetricsComponent } from 'src/components/salaries/salary-metrics/salary-metrics.component';
import { CurrencyRublePipeModule } from 'src/pipes/currency-ruble.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { MeUserResolver } from 'src/resolvers/me';
import { SalaryResolver } from 'src/resolvers/salary';
import { IssuesModule } from '../../issues/issues.module';
import { SalariesListComponent } from './salaries-list.component';
import { SalaryDetailComponent } from './salary-detail/salary-detail.component';


@NgModule({
  declarations: [
    SalariesComponent,
    SalaryMetricsComponent,
    SalariesListComponent,
    SalaryDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    SalariesRoutingModule,
    SalaryDetailWidgetModule,
    DatePipesModule,
    IssuesModule,
    CurrencyRublePipeModule
  ],
  exports: [
    SalariesComponent,
    SalaryMetricsComponent,
    SalariesListComponent,
    SalaryDetailComponent
  ],
  providers: [
    SalaryResolver,
    MeUserResolver
  ]
})
export class SalariesModule {
}
