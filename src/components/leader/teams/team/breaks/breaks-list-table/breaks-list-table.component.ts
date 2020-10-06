import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreaksTableComponent } from 'src/components/shared/work-breaks/list/work-breaks-list';
import { ViewType } from '../../../../../../models/enums/view-type';
import { Me } from '../../../../../../models/user';

@Component({
  selector: 'app-team-breaks-list-table-component',
  templateUrl: './breaks-list-table.component.html',
  styleUrls: ['./breaks-list-table.component.scss']
})

export class TeamBreaksListTableComponent extends BreaksTableComponent {

  viewType = ViewType;

  me: Me;

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);

    route.data.subscribe(({me}) => this.me = me);
  }

}
