import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { IssuesComponent } from 'src/components/shared/issues/list/issues';
import { BonusesComponent } from '../../shared/bonuses/list/bonuses';
import { BonusesListComponent } from '../../shared/bonuses/list/bonuses-list.component';

@Component({
  selector: 'app-developer-bonuses',
  templateUrl: './developer-bonuses.component.html',
  styleUrls: ['./developer-bonuses.component.scss']
})
export class DeveloperBonusesComponent extends BonusesComponent {

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
