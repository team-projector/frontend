import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MeRoutingModule} from './me-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MeServiceProvider} from '../../services/me/provider';
import {IssuesModule} from '../issues/issues.module';
import {MeUserResolver} from './resovers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MeRoutingModule,
    IssuesModule
  ],
  providers: [
    MeServiceProvider,
    MeUserResolver
  ]
})
export class MeModule {
}
