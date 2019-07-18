import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Salary} from 'src/models/salary';
import {UI} from 'junte-ui';

@Component({
  selector: 'app-salary-detail',
  templateUrl: './salary-detail.component.html',
  styleUrls: ['./salary-detail.component.scss']
})

export class SalaryDetailComponent implements OnInit {

  ui = UI;

  salary: Salary;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({salary}) => this.salary = salary);
  }
}
