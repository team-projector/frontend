import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MergeRequestsComponent } from 'src/components/shared/merge-requests/list/merge-requests';

@Component({
  selector: 'app-team-merge-requests-list',
  templateUrl: './merge-requests.component.html',
  styleUrls: ['./merge-requests.component.scss']
})

export class TeamMergeRequestsListComponent extends MergeRequestsComponent {
  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  getState(state: Object) {
    delete state['user'];
    delete state['team'];
    delete state['project'];
    delete state['dueDate'];
    return state;
  }
}

