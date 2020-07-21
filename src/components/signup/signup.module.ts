import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupRoutingModule } from './signup-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SignupRoutingModule,
    JunteUiModule
  ]
})
export class SignupModule {

}
