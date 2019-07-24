import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DEFAULT_PAGE_SIZE } from 'src/consts';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter as filtering, map } from 'rxjs/operators';
import { TableComponent, UI } from 'junte-ui';
import { PagingSalaries, SalariesFilter } from 'src/models/salary';
import { deserialize, serialize } from 'serialize-ts/dist';
import { AllSalariesGQL } from './salaries.graphql';
import { R } from 'apollo-angular/types';

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.scss']
})
export class SalariesComponent implements OnInit {

  ui = UI;

  private user$ = new BehaviorSubject<number>(null);

  @Input()
  set user(user: number) {
    this.user$.next(user);
  }

  filter: SalariesFilter = new SalariesFilter({offset: 0, first: DEFAULT_PAGE_SIZE});

  // TODO: @ViewChild(TableComponent) == undefined in AOT
  @ViewChild('table')
  table: TableComponent;

  constructor(private allSalaries: AllSalariesGQL) {
  }

  ngOnInit() {
    this.user$.pipe(filtering(u => !!u), distinctUntilChanged())
      .subscribe(user => {
        this.filter.user = user;
        this.table.fetcher = (filter: SalariesFilter) => {
          Object.assign(this.filter, filter);
          return this.allSalaries.fetch(serialize(this.filter) as R)
            .pipe(map(({data: {allSalaries}}: { data: { allSalaries } }) =>
              deserialize(allSalaries, PagingSalaries)));
        };
        this.table.load();
      });
  }

}
