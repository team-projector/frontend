import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { SalariesListComponent } from 'src/components/shared/salaries/list/salaries-list.component';
import { DatePipesModule } from '../../../../pipes/date-pipes.module';
import { MoneyPipesModule } from '../../../../pipes/money-pipes.module';
import { UserCardModule } from '../../users/card/user-card.module';

@NgModule({
  declarations: [
    SalariesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    JunteUiModule,
    DateFnsModule,
    DatePipesModule,
    MoneyPipesModule,
    UserCardModule
  ],
  exports: [
    SalariesListComponent
  ]
})
export class SalariesListModule {

}
