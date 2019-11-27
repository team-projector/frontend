import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssuesListComponent } from 'src/components/issues/issues/issues-list';
import { IssuesState } from 'src/components/issues/issues/issues.component';

@Component({
  selector: 'app-milestone-issues',
  templateUrl: './milestone-issues.component.html',
  styleUrls: ['./milestone-issues.component.scss']
})
export class MilestoneIssuesComponent extends IssuesListComponent {
  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  filter(previous: IssuesState, current: IssuesState): IssuesState {
    const state = super.filter(previous, current);
    if (!!current.ticket) {
      state.ticket = current.ticket;
    }
    if (!!current.milestone) {
      state.milestone = current.milestone;
    }
    return state;
  }
}
