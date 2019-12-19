import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreaksListComponent } from 'src/components/breaks/breaks/breaks-list';

@Component({
  selector: 'app-team-breaks-list-component',
  templateUrl: './breaks-list.component.html',
  styleUrls: ['./breaks-list.component.scss']
})

export class TeamBreaksListComponent extends BreaksListComponent {
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
