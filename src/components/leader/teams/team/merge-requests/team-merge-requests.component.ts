import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MergeRequestsComponent } from 'src/components/shared/merge-requests/list/merge-requests';

@Component({
  selector: 'app-team-merge-requests',
  templateUrl: './team-merge-requests.component.html',
  styleUrls: ['./team-merge-requests.component.scss']
})

export class TeamMergeRequestsComponent extends MergeRequestsComponent {
  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

}
