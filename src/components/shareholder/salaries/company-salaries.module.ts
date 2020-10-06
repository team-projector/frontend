import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { SalariesListModule } from '../../shared/salaries/list/salaries-list.module';
import { CompanySalariesRoutingModule } from './company-salaries-routing.module';
import { CompanySalariesComponent } from './company-salaries.component';

@NgModule({
  declarations: [
    CompanySalariesComponent
  ],
  imports: [
    CompanySalariesRoutingModule,

    CommonModule,
    JunteUiModule,
    SalariesListModule
  ]
})
export class CompanySalariesModule {

}
