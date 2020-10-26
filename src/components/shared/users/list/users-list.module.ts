import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { MoneyPipesModule } from '../../../../pipes/money-pipes.module';
import { UsersListComponent } from './users-list.component';

@NgModule({
  declarations: [
    UsersListComponent
  ],
  exports: [
    UsersListComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule,
    ReactiveFormsModule,
    MoneyPipesModule
  ]
})
export class UsersListModule {

}
