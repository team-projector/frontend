import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { MoneyPipesModule } from '../../../pipes/money-pipes.module';
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
        JunteUiModule,
        DateFnsModule,
      MoneyPipesModule
    ]
})
export class PenaltiesModule {
}
