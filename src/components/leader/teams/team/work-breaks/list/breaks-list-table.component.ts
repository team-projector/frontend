import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@junte/ui';
import { BreaksTableComponent } from 'src/components/shared/work-breaks/list/work-breaks-list';
import { LocalUI } from 'src/enums/local-ui';
import { ViewType } from 'src/models/enums/view-type';
import { Me } from 'src/models/user';

@Component({
  selector: 'app-team-breaks-list-table-component',
  templateUrl: './breaks-list-table.component.html',
  styleUrls: ['./breaks-list-table.component.scss']
})

export class TeamBreaksListTableComponent extends BreaksTableComponent {

  ui = UI;
  localUi = LocalUI;
  viewType = ViewType;

  me: Me;

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);

    route.data.subscribe(({me}) => this.me = me);
  }

}
