import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreaksListComponent } from 'src/components/breaks/breaks-list';

@Component({
  selector: 'app-developer-breaks-list-gantt',
  templateUrl: './breaks-list-gantt.component.html',
  styleUrls: ['./breaks-list-gantt.component.scss']
})

export class DeveloperBreaksListGanttComponent extends BreaksListComponent {
  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  getState(state: Object) {
    delete state['user'];
    return state;
  }
}
