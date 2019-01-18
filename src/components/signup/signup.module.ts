import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {SignupRoutingModule} from './signup-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SignupServiceProvider} from '../../services/signup/provider';
import {FormPipesModule} from 'junte-angular';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SignupRoutingModule,
    FormPipesModule
  ],
  providers: [
    SignupServiceProvider
  ]
})
export class SignupModule {

}
