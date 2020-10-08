import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@junte/ui';
import { NGXLogger } from 'ngx-logger';
import { IssuesComponent } from 'src/components/shared/issues/list/issues';
import { LocalUI } from '../../../enums/local-ui';
import { ViewType } from '../../../models/enums/view-type';

@Component({
  selector: 'app-developer-issues',
  templateUrl: './developer-issues.component.html',
  styleUrls: ['./developer-issues.component.scss']
})
export class DeveloperIssuesComponent extends IssuesComponent {

  ui = UI;
  localUi = LocalUI;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
