import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PopoverOptions, UI } from '@junte/ui';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { AllBonusesGQL, AllPenaltiesGQL } from 'src/components/salaries/salaries.graphql';
import { environment } from 'src/environments/environment';
import { MeManager } from 'src/managers/me.manager';
import { DurationFormat } from 'src/models/enums/duration-format';
import { Bonus, PagingBonuses, PagingPenalties, Penalty, Salary } from 'src/models/salary';
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { getMock } from 'src/utils/mocks';

@Component({
  selector: 'app-salary-detail-widget',
  templateUrl: './salary-detail-widget.component.html',
  styleUrls: ['./salary-detail-widget.component.scss']
})

export class SalaryDetailWidgetComponent {

  ui = UI;

  @Input() salary: Salary;
  durationFormat = DurationFormat;
  bonuses: Bonus[] = [];
  penalties: Penalty[] = [];

  taxesControl = this.fb.control(true);
  form = this.fb.group({
    taxes: this.taxesControl
  });

  constructor(private fb: FormBuilder,
              private allBonusesGQL: AllBonusesGQL,
              private allPenaltiesGQL: AllPenaltiesGQL,
              private me: MeManager) {
  }

  ngOnInit() {
    this.me.user$.pipe(filter(user => !!user)).subscribe(user => {
      let action = this.allBonusesGQL.fetch({salary: this.salary.id, user: user.id})
        .pipe(catchGQLErrors(), map(({data: {allBonuses}}) => deserialize(allBonuses, PagingBonuses)));
      (environment.mocks ? of(getMock(PagingBonuses)) : action)
        .subscribe(bonuses => this.bonuses = bonuses.results);

      action = this.allPenaltiesGQL.fetch({salary: this.salary.id, user: user.id})
        .pipe(catchGQLErrors(), map(({data: {allPenalties}}) => deserialize(allPenalties, PagingPenalties)));
      (environment.mocks ? of(getMock(PagingPenalties)) : action)
        .subscribe(penalties => this.penalties = penalties.results);
    });
  }

  getOptions(options: any, show: boolean = true) {
    return show ? new PopoverOptions({
      ...options,
      trigger: UI.overlays.popover.trigger.hover
    }) : null;
  }

}
