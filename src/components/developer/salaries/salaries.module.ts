import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SalariesListComponent} from './salaries-list.component';
import {SalaryDetailComponent} from './salary-detail/salary-detail.component';
import {JunteUiModule} from 'junte-ui';
import {SalariesRoutingModule} from 'src/components/developer/salaries/salaries-routing.module';
import {SalariesComponent} from 'src/components/salaries/salaries/salaries.component';
import {SalaryMetricsComponent} from 'src/components/salaries/salary-metrics/salary-metrics.component';
import {DatePipesModule} from 'src/pipes/date-pipes.module';
import {SalaryResolver} from 'src/resolvers/salary';
import {SalaryDetailWidgetModule} from 'src/components/salaries/salary-detail-widget/salary-detail-widget.module';
import {IssuesModule} from '../../issues/issues.module';


@NgModule({
  declarations: [
    SalariesComponent,
    SalaryMetricsComponent,
    SalariesListComponent,
    SalaryDetailComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule,
    SalariesRoutingModule,
    SalaryDetailWidgetModule,
    DatePipesModule,
    IssuesModule
  ],
  exports: [
    SalariesComponent,
    SalaryMetricsComponent,
    SalariesListComponent,
    SalaryDetailComponent
  ],
  providers: [
    SalaryResolver
  ]
})
export class SalariesModule {
}
