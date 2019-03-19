import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeveloperRoutingModule} from './developer-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {IssuesModule} from '../issues/issues.module';
import {MeUserWithMetricsResolver} from '../../resolvers/me';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DeveloperRoutingModule,
    IssuesModule
  ],
  providers: [
    MeUserWithMetricsResolver
  ]
})
export class DeveloperModule {
}
