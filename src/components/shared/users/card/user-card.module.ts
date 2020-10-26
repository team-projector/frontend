import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { UserCardComponent } from './user-card.component';

@NgModule({
  declarations: [
    UserCardComponent
  ],
  imports: [
    CommonModule,
    JunteUiModule
  ],
  exports: [
    UserCardComponent
  ]
})
export class UserCardModule {

}
