import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@esanum/ui';
import { NGXLogger } from 'ngx-logger';
import { LocalUI } from 'src/enums/local-ui';
import { ViewType } from 'src/models/enums/view-type';
import { PenaltiesComponent } from '../../shared/penalties/penalties';

@Component({
  selector: 'app-developer-penalties',
  templateUrl: './developer-penalties.component.html',
  styleUrls: ['./developer-penalties.component.scss']
})
export class DeveloperPenaltiesComponent extends PenaltiesComponent {

  ui = UI;
  localUi = LocalUI;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
