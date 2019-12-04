import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MergeRequestsListComponent } from 'src/components/issues/merge-requests/merge-requests-list';

@Component({
  selector: 'app-developer-merge-requests-list',
  templateUrl: './merge-requests-list.component.html',
  styleUrls: ['./merge-requests-list.component.scss']
})
export class DeveloperMergeRequestsListComponent extends MergeRequestsListComponent {
  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  getState(state: Object) {
    delete state['user'];
    delete state['project'];
    return state;
  }
}
