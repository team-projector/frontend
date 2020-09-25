import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { SalariesListComponent } from 'src/components/shared/salaries/list/salaries-list.component';
import { DatePipesModule } from '../../../../pipes/date-pipes.module';

@NgModule({
  declarations: [
    SalariesListComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule,
    DateFnsModule,
    DatePipesModule
  ],
  exports: [
    SalariesListComponent
  ]
})
export class SalariesListModule {

}
