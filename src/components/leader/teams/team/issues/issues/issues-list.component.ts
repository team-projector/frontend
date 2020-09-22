import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import {IssuesListComponent} from 'src/components/issues/issues/issues-list';

@Component({
  selector: 'app-team-list-issues-component',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class TeamIssuesListComponent extends IssuesListComponent {
  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

  getState(state: Object) {
    delete state['user'];
    delete state['team'];
    delete state['project'];
    delete state['dueDate'];
    return state;
  }
}
