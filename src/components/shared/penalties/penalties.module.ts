import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
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
        DateFnsModule
    ]
})
export class PenaltiesModule {
}
