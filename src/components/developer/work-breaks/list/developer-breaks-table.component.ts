import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@junte/ui';
import { BreaksTableComponent } from 'src/components/shared/work-breaks/list/work-breaks-list';
import { LocalUI } from 'src/enums/local-ui';
import { Me } from 'src/models/user';

@Component({
  selector: 'app-developer-breaks-table',
  templateUrl: './developer-breaks-table.component.html',
  styleUrls: ['./developer-breaks-table.component.scss']
})

export class DeveloperBreaksTableComponent extends BreaksTableComponent {

  ui = UI;
  localUi = LocalUI;

  me: Me;

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);

    route.data.subscribe(({me}) => this.me = me);
  }

}
