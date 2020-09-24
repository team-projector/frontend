import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { SalariesList } from '../../salaries/salaries-list';

@Component({
  selector: 'app-developer-salaries',
  templateUrl: './developer-salaries.component.html',
  styleUrls: ['./developer-salaries.component.scss']
})

export class DeveloperSalariesComponent extends SalariesList {

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

  getState(state: Object) {
    delete state['user'];
    return state;
  }

}
