import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupRoutingModule } from './signup-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
  BlockModule,
  ButtonModule,
  FormModule,
  InformerModule,
  InputModule,
  LinkModule,
  MenuModule,
  ShortcutsModule,
  StackModule
} from '@junte/ui';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SignupRoutingModule,
    LinkModule,
    InformerModule,
    BlockModule,
    FormModule,
    MenuModule,
    InputModule,
    StackModule,
    ButtonModule,
    ShortcutsModule
  ]
})
export class SignupModule {

}
