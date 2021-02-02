import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule, LabelModule, MenuModule, PopoverModule, ProgressBarModule, StackModule, TableModule } from '@junte/ui';
import { MoneyPipesModule } from 'src/pipes/money-pipes.module';
import { UserCardModule } from '../card/user-card.module';
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
    FormModule,
    TableModule,
    StackModule,
    ProgressBarModule,
    MenuModule,
    LabelModule,
    PopoverModule,
    ReactiveFormsModule,
    MoneyPipesModule,
    UserCardModule
  ]
})
export class UsersListModule {

}
