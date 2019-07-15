import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {DatePipesModule} from '../../pipes/date-pipes.module';
import {ArrayPipesModule} from '../../pipes/array-pipes.module';
import {IssuesComponent} from './issues/issues.component';
import {TimeExpensesComponent} from './time-expenses/time-expenses.component';
import {JunteUiModule} from 'junte-ui';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    IssuesComponent,
    TimeExpensesComponent
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
    IssuesComponent,
    TimeExpensesComponent
  ]
})
export class IssuesModule {

}
