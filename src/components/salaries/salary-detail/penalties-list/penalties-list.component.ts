import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PenaltiesComponent } from '../../../shared/penalties/penalties';

@Component({
  selector: 'app-penalties-list',
  templateUrl: './penalties-list.component.html',
  styleUrls: ['./penalties-list.component.scss']
})
export class SalaryPenaltiesListComponent extends PenaltiesComponent {

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  getState(state: Object) {
    delete state['user'];
    delete state['salary'];
    return state;
  }

}
