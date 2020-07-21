import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UI } from '@junte/ui';
import { DurationFormat } from 'src/models/enums/duration-format';
import { ViewType } from 'src/models/enums/view-type';
import { Salary } from 'src/models/salary';

@Component({
  selector: 'app-salary-detail',
  templateUrl: './salary-detail.component.html',
  styleUrls: ['./salary-detail.component.scss']
})

export class SalaryDetailComponent {
  ui = UI;
  salary: Salary;
  viewType = ViewType;
  durationFormat = DurationFormat;

  constructor(route: ActivatedRoute) {
    route.data.subscribe(({salary}) => this.salary = salary);
  }
}
