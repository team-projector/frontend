import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreaksTableComponent } from 'src/components/shared/breaks/list/breaks-list';

@Component({
  selector: 'app-team-breaks-list-table-component',
  templateUrl: './breaks-list-table.component.html',
  styleUrls: ['./breaks-list-table.component.scss']
})

export class TeamBreaksListTableComponent extends BreaksTableComponent {
  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  getState(state: Object) {
    delete state['user'];
    delete state['team'];
    return state;
  }
}
