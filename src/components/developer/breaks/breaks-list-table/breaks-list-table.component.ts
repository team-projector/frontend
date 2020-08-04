import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreaksListComponent } from 'src/components/breaks/breaks-list';

@Component({
  selector: 'app-developer-breaks-list-table',
  templateUrl: './breaks-list-table.component.html',
  styleUrls: ['./breaks-list-table.component.scss']
})

export class DeveloperBreaksListTableComponent extends BreaksListComponent {
  constructor(route: ActivatedRoute,
              router: Router,
              ) {
    super(route, router);
  }

  getState(state: Object) {
    delete state['user'];
    return state;
  }
}
