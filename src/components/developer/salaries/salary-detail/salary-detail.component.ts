import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UI } from 'junte-ui';
import { Salary } from 'src/models/salary';
import { User } from 'src/models/user';

@Component({
  selector: 'app-salary-detail',
  templateUrl: './salary-detail.component.html',
  styleUrls: ['./salary-detail.component.scss']
})

export class SalaryDetailComponent implements OnInit {

  ui = UI;
  user: User;
  salary: Salary;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({user, salary}) => [this.user, this.salary] = [user, salary]);
  }
}
