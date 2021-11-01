import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppLayoutModule, BlockModule } from '@esanum/ui';
import { IssuesListModule } from 'src/components/shared/issues/list/issues-list.module';
import { DeveloperIssuesRoutingModule } from './developer-issues-routing.module';
import { DeveloperIssuesComponent } from './developer-issues.component';

@NgModule({
  declarations: [
    DeveloperIssuesComponent
  ],
  imports: [
    DeveloperIssuesRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    AppLayoutModule,
    BlockModule,

    IssuesListModule
  ]
})
export class DeveloperIssuesModule {

}
