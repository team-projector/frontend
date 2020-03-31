import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from 'junte-ui';
import { BonusesModule } from 'src/components/bonuses/bonuses.module';
import { DeveloperIssuesModule } from 'src/components/developer/issues/developer-issues.module';
import { SalariesRoutingModule } from 'src/components/developer/salaries/salaries-routing.module';
import { PenaltiesModule } from 'src/components/penalties/penalties.module';
import { SalariesComponent } from 'src/components/salaries/salaries.component';
import { SalaryDetailWidgetModule } from 'src/components/salaries/salary-detail-widget/salary-detail-widget.module';
import { SalaryMetricsComponent } from 'src/components/salaries/salary-metrics/salary-metrics.component';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { MeUserResolver } from 'src/resolvers/me';
import { SalaryResolver } from 'src/resolvers/salary';
import { IssuesModule } from '../../issues/issues.module';
import { SalariesListComponent } from './salaries-list.component';
import { SalaryBonusesListComponent } from 'src/components/developer/salaries/salary-detail/bonuses-list/bonuses-list.component';
import { SalaryPenaltiesListComponent } from 'src/components/developer/salaries/salary-detail/penalties-list/penalties-list.component';
import { SalaryDetailComponent } from './salary-detail/salary-detail.component';


@NgModule({
  declarations: [
    SalariesComponent,
    SalaryMetricsComponent,
    SalariesListComponent,
    SalaryDetailComponent,
    SalaryBonusesListComponent,
    SalaryPenaltiesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    SalariesRoutingModule,
    SalaryDetailWidgetModule,
    DatePipesModule,
    IssuesModule,
    BonusesModule,
    PenaltiesModule,
    DeveloperIssuesModule
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
