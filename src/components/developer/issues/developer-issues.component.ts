import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { IssuesComponent } from 'src/components/shared/issues/list/issues';
import { LocalUI } from '../../../enums/local-ui';

@Component({
  selector: 'app-developer-issues',
  templateUrl: './developer-issues.component.html',
  styleUrls: ['./developer-issues.component.scss']
})
export class DeveloperIssuesComponent extends IssuesComponent {

  localUi = LocalUI;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
