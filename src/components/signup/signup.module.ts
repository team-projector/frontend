import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {SignupRoutingModule} from './signup-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {UsersServiceProvider} from '../../services/users/provider';
import {FormPipesModule} from 'junte-angular';
import {MeServiceProvider} from '../../services/me/provider';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SignupRoutingModule,
    FormPipesModule
  ],
  providers: [
    UsersServiceProvider,
    MeServiceProvider
  ]
})
export class SignupModule {

}
