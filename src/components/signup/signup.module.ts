import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {SignupRoutingModule} from './signup-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {UsersServiceProvider} from '../../services/users/provider';
import {FormPipesModule} from 'junte-angular';
import {MeServiceProvider} from '../../services/me/provider';
import {JunteUiModule} from 'junte-ui';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SignupRoutingModule,
    FormPipesModule,
    JunteUiModule
  ],
  providers: [
    UsersServiceProvider,
    MeServiceProvider
  ]
})
export class SignupModule {

}
