import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { MergeRequestsModule } from '../../../../shared/merge-requests/list/merge-requests.module';
import { TeamMergeRequestsComponent } from './team-merge-requests.component';
import { TeamMergeRequestsRoutingModule } from './team-merge-requests-routing.module';

@NgModule({
  declarations: [
    TeamMergeRequestsComponent
  ],
  imports: [
    TeamMergeRequestsRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,

    MergeRequestsModule
  ]
})
export class TeamMergeRequestsModule {

}
