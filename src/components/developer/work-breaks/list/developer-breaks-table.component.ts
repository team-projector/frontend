import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreaksTableComponent } from 'src/components/shared/work-breaks/list/work-breaks-list';
import { Me } from '../../../../models/user';

@Component({
  selector: 'app-developer-breaks-table',
  templateUrl: './developer-breaks-table.component.html',
  styleUrls: ['./developer-breaks-table.component.scss']
})

export class DeveloperBreaksTableComponent extends BreaksTableComponent {

  me: Me;

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);

    route.data.subscribe(({me}) => this.me = me);
  }

}
