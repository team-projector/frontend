import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IssuesListComponent} from 'src/components/issues/issues/issues-list';

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

  getState(state: Object) {
    delete state['milestone'];
    return state;
  }
}
