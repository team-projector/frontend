import { NgModule } from '@angular/core';
import { SalariesComponent } from 'src/components/salaries/salaries/salaries.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SalariesServiceProvider } from 'src/services/salaries/provider';
import { RouterModule } from '@angular/router';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { JunteUiModule } from 'junte-ui';


@NgModule({
  declarations: [
    SalariesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DatePipesModule,
    ArrayPipesModule,
    JunteUiModule
  ],
  exports: [
    SalariesComponent
  ],
  providers: [
    SalariesServiceProvider
  ]
})
export class SalariesModule {
}
