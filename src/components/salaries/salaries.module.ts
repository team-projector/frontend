import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { SalariesComponent } from 'src/components/salaries/salaries.component';
import { DatePipesModule } from '../../pipes/date-pipes.module';

@NgModule({
  declarations: [
    SalariesComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule,
    DateFnsModule,
    DatePipesModule
  ],
  exports: [
    SalariesComponent
  ]
})
export class SalariesModule {

}
