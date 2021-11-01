import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@esanum/ui';
import { MergeRequestsComponent } from 'src/components/shared/merge-requests/list/merge-requests';
import { LocalUI } from 'src/enums/local-ui';
import { ViewType } from 'src/models/enums/view-type';

@Component({
  selector: 'app-team-merge-requests',
  templateUrl: './team-merge-requests.component.html',
  styleUrls: ['./team-merge-requests.component.scss']
})

export class TeamMergeRequestsComponent extends MergeRequestsComponent {

  ui = UI;
  localUi = LocalUI;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

}
