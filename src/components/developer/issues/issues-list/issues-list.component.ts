import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { IssuesListComponent } from 'src/components/issues/issues/issues-list';
import { IssuesState } from 'src/components/issues/issues/issues.component';

@Component({
  selector: 'app-developer-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class DeveloperIssuesListComponent extends IssuesListComponent {
  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  filter(previous: IssuesState, current: IssuesState): IssuesState {
    const state = super.filter(previous, current);
    if (!!current.due_date) {
      state.due_date = format(current.due_date, 'YYYY-MM-DD');
    }
    if (!!current.project) {
      state.project = current.project;
    }
    return state;
  }
}
