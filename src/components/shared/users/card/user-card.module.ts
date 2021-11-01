import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule, StackModule } from '@esanum/ui';
import { UserCardComponent } from './user-card.component';

@NgModule({
  declarations: [
    UserCardComponent
  ],
  imports: [
    CommonModule,
    StackModule,
    AvatarModule
  ],
  exports: [
    UserCardComponent
  ]
})
export class UserCardModule {

}
