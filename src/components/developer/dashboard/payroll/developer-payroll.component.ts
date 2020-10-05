import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UI } from '@junte/ui';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { LocalUI } from 'src/enums/local-ui';
import { environment } from 'src/environments/environment';
import { Bonus, PagingBonuses } from 'src/models/bonus';
import { PagingPenalties, Penalty } from 'src/models/penalty';
import { Me } from 'src/models/user';
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { getMock } from 'src/utils/mocks';
import { AllBonusesGQL, AllPenaltiesGQL } from './developer-payroll.graphql';

@Component({
  selector: 'app-developer-payroll',
  templateUrl: './developer-payroll.component.html',
  styleUrls: ['./developer-payroll.component.scss']
})

export class DeveloperPayrollComponent implements OnInit {

  ui = UI;
  today = new Date();
  bonuses: Bonus[] = [];
  penalties: Penalty[] = [];
  localUi = LocalUI;
  opened = false;

  @Input()
  me: Me;

  constructor(private fb: FormBuilder,
              private allBonusesGQL: AllBonusesGQL,
              private allPenaltiesGQL: AllPenaltiesGQL) {
  }

  ngOnInit() {
    let action = this.allBonusesGQL.fetch({salary: null, user: this.me.id})
      .pipe(catchGQLErrors(), map(({data: {allBonuses}}) => deserialize(allBonuses, PagingBonuses)));
    (environment.mocks ? of(getMock(PagingBonuses)) : action)
      .subscribe(bonuses => this.bonuses = bonuses.results);

    action = this.allPenaltiesGQL.fetch({salary: null, user: this.me.id})
      .pipe(catchGQLErrors(), map(({data: {allPenalties}}) => deserialize(allPenalties, PagingPenalties)));
    (environment.mocks ? of(getMock(PagingPenalties)) : action)
      .subscribe(penalties => this.penalties = penalties.results);
  }
}
