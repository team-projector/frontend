import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssuesListComponent } from 'src/components/issues/issues/issues-list';

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

  getState(state: Object) {
    delete state['user'];
    return state;
  }
}
