import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MergeRequestsListComponent } from 'src/components/issues/merge-requests/merge-requests-list';

@Component({
  selector: 'app-developer-merge-requests',
  templateUrl: './developer-merge-requests.component.html',
  styleUrls: ['./developer-merge-requests.component.scss']
})
export class DeveloperMergeRequestsComponent extends MergeRequestsListComponent {

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
