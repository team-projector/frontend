import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreaksListComponent } from 'src/components/breaks/breaks/breaks-list';


@Component({
  selector: 'app-developer-breaks-list',
  templateUrl: './breaks-list.component.html',
  styleUrls: ['./breaks-list.component.scss']
})

export class DeveloperBreaksListComponent extends BreaksListComponent {
  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  getState(state: Object) {
    delete state['user'];
    return state;
  }
}
