import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import {IssuesComponent} from 'src/components/shared/issues/list/issues';

@Component({
  selector: 'app-team-list-issues-component',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class TeamIssuesListComponent extends IssuesComponent {
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
