import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { BonusesComponent } from '../../shared/bonuses/list/bonuses';

@Component({
  selector: 'app-developer-penalties',
  templateUrl: './developer-penalties.component.html',
  styleUrls: ['./developer-penalties.component.scss']
})
export class DeveloperPenaltiesComponent extends BonusesComponent {

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
