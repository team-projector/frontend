import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormModule, LinkModule, TableModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { UserCardModule } from '../users/card/user-card.module';
import { PenaltiesListComponent } from './penalties-list.component';

@NgModule({
  declarations: [
    PenaltiesListComponent
  ],
  exports: [
    PenaltiesListComponent
  ],
  imports: [
    CommonModule,
    FormModule,
    TableModule,
    LinkModule,
    DateFnsModule,
    MoneyPipesModule,
    UserCardModule
  ]
})
export class PenaltiesModule {
}
