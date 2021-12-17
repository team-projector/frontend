import {Component} from '@angular/core';
import {IssuesComponent} from '../../../shared/issues/list/issues';
import {UI} from '@esanum/ui';
import {LocalUI} from '../../../../enums/local-ui';
import {ViewType} from '../../../../models/enums/view-type';
import {ActivatedRoute, Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-developer-issues-list',
  templateUrl: './developer-issues-list.component.html',
  styleUrls: ['./developer-issues-list.component.scss']
})
export class DeveloperIssuesListComponent extends IssuesComponent {

  ui = UI;
  localUi = LocalUI;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }
}
