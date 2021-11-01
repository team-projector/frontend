import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UI } from '@esanum/ui';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from '@junte/serialize-ts';
import { environment } from 'src/environments/environment';
import { Bonus, PagingBonuses } from 'src/models/bonus';
import { PagingPenalties, Penalty } from 'src/models/penalty';
import { Me } from 'src/models/user';
import { catchGQLErrors } from 'src/utils/gql-errors';
import { getMock } from '@junte/mocker';
import { LocalUI } from 'src/enums/local-ui';
import { AllBonusesGQL, AllPenaltiesGQL } from './developer-payroll.graphql';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-developer-payroll',
  templateUrl: './developer-payroll.component.html',
  styleUrls: ['./developer-payroll.component.scss'],
  animations: [
    trigger('appear', [
        state(
          'void',
          style({
            opacity: 0,
            height: 0
          })
        ),
        state(
          '*',
          style({
            height: '*',
            opacity: 1,
          })
        ),
        transition(
          'void <=> *',
          [
            animate('.5s ease')
          ]
        ),
      ]
    ),
  ]
})

export class DeveloperPayrollComponent implements OnInit {

  ui = UI;
  today = new Date();
  bonuses: Bonus[] = [];
  penalties: Penalty[] = [];
  localUi = LocalUI;
  opened = false;

  i18n = {
    hideDetails: $localize`:@@action.more_details:Hide details`,
    moreDetails: $localize`:@@action.hide_details:More details`
  };

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

  getOptions(options: any, show: boolean = true) {
    return show ? {
      ...options,
      trigger: UI.trigger.hover
    } : null;
  }

}
