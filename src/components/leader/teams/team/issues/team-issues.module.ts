import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppLayoutModule, BlockModule } from '@junte/ui';
import { IssuesListModule } from 'src/components/shared/issues/list/issues-list.module';
import { TeamIssuesComponent } from './team-issues.component';
import { TeamIssuesRoutingModule } from './team-issues-routing.module';

@NgModule({
  declarations: [
    TeamIssuesComponent
  ],
  imports: [
    TeamIssuesRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    AppLayoutModule,
    BlockModule,

    IssuesListModule
  ]
})
export class TeamIssuesModule {

}
