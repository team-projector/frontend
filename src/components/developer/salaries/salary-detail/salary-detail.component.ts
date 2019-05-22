import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Salary } from 'src/models/salaries';
import { ISalariesService, salaries_service } from 'src/services/salaries/interface';
import { TableComponent, UI } from 'junte-ui';

@Component({
  selector: 'app-salary-detail',
  templateUrl: './salary-detail.component.html',
  styleUrls: ['./salary-detail.component.scss']
})

export class SalaryDetailComponent implements OnInit {

  private _salary: Salary;

  ui = UI;

  @ViewChild(TableComponent) table: TableComponent;

  set salary(salary: Salary) {
    this._salary = salary;

    if (!!salary) {
      this.loadTimeExpenses();
    }
  }

  get salary() {
    return this._salary;
  }

  constructor(@Inject(salaries_service) private salariesService: ISalariesService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({salary}) => this.salary = salary);
  }

  private loadTimeExpenses() {
    this.table.fetcher = () => this.salariesService.timeExpenses(this.salary.id);
    this.table.load();
  }
}
