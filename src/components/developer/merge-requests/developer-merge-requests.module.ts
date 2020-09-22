import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { IssuesModule } from 'src/components/issues/issues.module';
import { DeveloperMergeRequestsRoutingModule } from './developer-merge-requests-routing.module';
import { DeveloperMergeRequestsComponent } from './developer-merge-requests.component';

@NgModule({
  declarations: [
    DeveloperMergeRequestsComponent
  ],
  imports: [
    DeveloperMergeRequestsRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,

    IssuesModule
  ]
})
export class DeveloperMergeRequestsModule {

}
