import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { IssuesComponent } from 'src/components/shared/issues/list/issues';
import { LocalUI } from '../../../../../enums/local-ui';
import { ViewType } from '../../../../../models/enums/view-type';

@Component({
  selector: 'app-team-issues-component',
  templateUrl: './team-issues.component.html',
  styleUrls: ['./team-issues.component.scss']
})
export class TeamIssuesComponent extends IssuesComponent {

  localUi = LocalUI;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
