import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TableComponent, UI } from 'junte-ui';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { AllBonusesGQL } from 'src/components/salaries/salaries.graphql';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { PagingBonuses } from 'src/models/salary';
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { getMock } from 'src/utils/mocks';

@Component({
  selector: 'app-bonuses',
  templateUrl: './bonuses.component.html',
  styleUrls: ['./bonuses.component.scss']
})
export class BonusesComponent implements OnInit {

  ui = UI;
  @Input() salary: string;
  @Input() user: string;

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private allBonusesGQL: AllBonusesGQL) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingBonuses)).pipe(delay(MOCKS_DELAY))
        : this.allBonusesGQL.fetch({salary: this.salary, user: this.user})
          .pipe(catchGQLErrors(), map(({data: {allBonuses}}) => deserialize(allBonuses, PagingBonuses)));
    };
    this.table.load();
  }

}
