import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreaksTableComponent } from 'src/components/shared/work-breaks/list/work-breaks-list';

@Component({
  selector: 'app-team-breaks-list-gantt-component',
  templateUrl: './breaks-list-gantt.component.html',
  styleUrls: ['./breaks-list-gantt.component.scss']
})

export class TeamBreaksListGanttComponent extends BreaksTableComponent {
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
