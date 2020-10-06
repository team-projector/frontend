import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ViewType } from '../../../../../models/enums/view-type';
import { PenaltiesComponent } from '../../../../shared/penalties/penalties';

@Component({
  selector: 'app-developer-penalties',
  templateUrl: './team-penalties.component.html',
  styleUrls: ['./team-penalties.component.scss']
})
export class TeamPenaltiesComponent extends PenaltiesComponent {

  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
