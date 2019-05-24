import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerDashboardRoutingModule} from './manager-dashboard-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ManagerDashboardComponent} from './manager-dashboard.component';
import {JunteUiModule} from 'junte-ui';
import {MilestonesServiceProvider} from '../../../services/milestones/provider';
import {DatePipesModule} from '../../../pipes/date-pipes.module';

@NgModule({
  declarations: [
    ManagerDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    ManagerDashboardRoutingModule,
    DatePipesModule
  ],
  providers: [
    MilestonesServiceProvider
  ]
})
export class ManagerDashboardModule {

}
