import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PenaltiesListComponent } from 'src/components/penalties/penalties-list.component';

@Component({
  selector: 'app-penalties-list',
  templateUrl: './penalties-list.component.html',
  styleUrls: ['./penalties-list.component.scss']
})
export class SalaryPenaltiesListComponent extends PenaltiesListComponent {

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  getState(state: Object) {
    delete state['user'];
    delete state['project'];
    return state;
  }

}
