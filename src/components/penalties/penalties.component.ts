import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TableComponent, UI } from 'junte-ui';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { AllPenaltiesGQL } from 'src/components/salaries/salaries.graphql';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { PagingPenalties } from 'src/models/salary';
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { getMock } from 'src/utils/mocks';

@Component({
  selector: 'app-penalties',
  templateUrl: './penalties.component.html',
  styleUrls: ['./penalties.component.scss']
})
export class PenaltiesComponent implements OnInit {

  ui = UI;
  @Input() salary: string;
  @Input() user: string;

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private allPenaltiesGQL: AllPenaltiesGQL) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingPenalties)).pipe(delay(MOCKS_DELAY))
        : this.allPenaltiesGQL.fetch({salary: this.salary, user: this.user})
          .pipe(catchGQLErrors(), map(({data: {allPenalties}}) => deserialize(allPenalties, PagingPenalties)));
    };
    this.table.load();
  }

}
