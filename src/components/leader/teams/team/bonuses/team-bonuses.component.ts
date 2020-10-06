import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ViewType } from '../../../../../models/enums/view-type';
import { BonusesComponent } from '../../../../shared/bonuses/list/bonuses';

@Component({
  selector: 'app-team-bonuses',
  templateUrl: './team-bonuses.component.html',
  styleUrls: ['./team-bonuses.component.scss']
})
export class TeamBonusesComponent extends BonusesComponent {

  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
