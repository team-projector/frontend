import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppLayoutModule, BlockModule } from '@junte/ui';
import { DeveloperSalariesRoutingModule } from 'src/components/developer/salaries/developer-salaries-routing.module';
import { SalariesListModule } from '../../shared/salaries/list/salaries-list.module';
import { DeveloperSalariesComponent } from './developer-salaries.component';

@NgModule({
  declarations: [
    DeveloperSalariesComponent
  ],
  imports: [
    DeveloperSalariesRoutingModule,

    CommonModule,
    AppLayoutModule,
    BlockModule,
    SalariesListModule
  ]
})
export class DeveloperSalariesModule {

}
