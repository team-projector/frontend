import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule, LinkModule, TableModule } from '@esanum/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { UserCardModule } from '../../users/card/user-card.module';
import { BonusesListComponent } from './bonuses-list.component';

@NgModule({
  declarations: [
    BonusesListComponent
  ],
  exports: [
    BonusesListComponent
  ],
  imports: [
    CommonModule,
    FormModule,
    TableModule,
    LinkModule,
    ReactiveFormsModule,
    DateFnsModule,
    MoneyPipesModule,
    UserCardModule
  ]
})
export class BonusesListModule {
}
