import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MergeRequestsComponent } from 'src/components/shared/merge-requests/list/merge-requests';

@Component({
  selector: 'app-developer-merge-requests',
  templateUrl: './developer-merge-requests.component.html',
  styleUrls: ['./developer-merge-requests.component.scss']
})
export class DeveloperMergeRequestsComponent extends MergeRequestsComponent {

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

}
