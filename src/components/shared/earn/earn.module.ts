import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { EarnComponent } from './earn.component';

@NgModule({
  imports: [
    CommonModule,
    MoneyPipesModule
  ],
  declarations: [
    EarnComponent
  ],
  exports: [
    EarnComponent
  ],
})
export class EarnModule {

}
