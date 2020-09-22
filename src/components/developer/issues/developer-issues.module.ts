import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { IssuesModule } from 'src/components/issues/issues.module';
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
    JunteUiModule,

    IssuesModule
  ]
})
export class DeveloperIssuesModule {

}
