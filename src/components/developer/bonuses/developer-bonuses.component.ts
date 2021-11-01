import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@esanum/ui';
import { NGXLogger } from 'ngx-logger';
import { LocalUI } from 'src/enums/local-ui';
import { ViewType } from 'src/models/enums/view-type';
import { BonusesComponent } from '../../shared/bonuses/list/bonuses';

@Component({
  selector: 'app-developer-bonuses',
  templateUrl: './developer-bonuses.component.html',
  styleUrls: ['./developer-bonuses.component.scss']
})
export class DeveloperBonusesComponent extends BonusesComponent {

  ui = UI;
  localUi = LocalUI;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
