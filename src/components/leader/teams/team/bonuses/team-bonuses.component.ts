import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@esanum/ui';
import { NGXLogger } from 'ngx-logger';
import { LocalUI } from 'src/enums/local-ui';
import { ViewType } from 'src/models/enums/view-type';
import { BonusesComponent } from '../../../../shared/bonuses/list/bonuses';

@Component({
  selector: 'app-team-bonuses',
  templateUrl: './team-bonuses.component.html',
  styleUrls: ['./team-bonuses.component.scss']
})
export class TeamBonusesComponent extends BonusesComponent {

  ui = UI;
  localUi = LocalUI;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
