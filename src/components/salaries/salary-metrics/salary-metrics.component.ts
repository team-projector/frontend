import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PopoverOptions, UI } from '@junte/ui';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { AllBonusesGQL, AllPenaltiesGQL } from 'src/components/salaries/salaries.graphql';
import { environment } from 'src/environments/environment';
import { Bonus, PagingBonuses, PagingPenalties, Penalty } from 'src/models/salary';
import { Me } from 'src/models/user';
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { getMock } from 'src/utils/mocks';

@Component({
  selector: 'app-salary-metrics',
  templateUrl: './salary-metrics.component.html',
  styleUrls: ['./salary-metrics.component.scss']
})

export class SalaryMetricsComponent implements OnInit {

  ui = UI;
  today = new Date();
  bonuses: Bonus[] = [];
  penalties: Penalty[] = [];

  taxesControl = this.fb.control(true);
  form = this.fb.group({
    taxes: this.taxesControl
  });

  @Input() user: Me;

  constructor(private fb: FormBuilder,
              private allBonusesGQL: AllBonusesGQL,
              private allPenaltiesGQL: AllPenaltiesGQL) {
  }

  ngOnInit() {
    let action = this.allBonusesGQL.fetch({salary: null, user: this.user.id})
      .pipe(catchGQLErrors(), map(({data: {allBonuses}}) => deserialize(allBonuses, PagingBonuses)));
    (environment.mocks ? of(getMock(PagingBonuses)) : action)
      .subscribe(bonuses => this.bonuses = bonuses.results);

    action = this.allPenaltiesGQL.fetch({salary: null, user: this.user.id})
      .pipe(catchGQLErrors(), map(({data: {allPenalties}}) => deserialize(allPenalties, PagingPenalties)));
    (environment.mocks ? of(getMock(PagingPenalties)) : action)
      .subscribe(penalties => this.penalties = penalties.results);
  }

  getOptions(options: any, show: boolean = true) {
    return show ? new PopoverOptions({
      ...options,
      trigger: UI.overlays.popover.trigger.hover
    }) : null;
  }
}
