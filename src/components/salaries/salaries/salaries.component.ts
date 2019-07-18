import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE} from 'src/consts';
import {BehaviorSubject} from 'rxjs';
import {distinctUntilChanged, filter as filtering, map, tap} from 'rxjs/operators';
import {TableComponent, UI} from 'junte-ui';
import {PagingSalaries, SalariesFilter} from 'src/models/salary';
import {graph_ql_service, IGraphQLService} from '../../../services/graphql/interface';
import {deserialize, serialize} from 'serialize-ts/dist';
import {queries} from './salaries.queries';

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

  filter: SalariesFilter = new SalariesFilter({offset: DEFAULT_PAGE, first: DEFAULT_PAGE_SIZE});

  // TODO: @ViewChild(TableComponent) == undefined in AOT
  @ViewChild('table')
  table: TableComponent;

  constructor(@Inject(graph_ql_service) private graphQL: IGraphQLService) {
  }

  ngOnInit() {
    this.user$.pipe(filtering(u => !!u), distinctUntilChanged())
      .subscribe(user => {
        this.filter.user = user;
        this.table.fetcher = (filter: SalariesFilter) => {
          Object.assign(this.filter, filter);
          return this.graphQL.get(queries.salaries, serialize(this.filter))
            .pipe(map(({data: {allSalaries}}: { data: { allSalaries } }) =>
              deserialize(allSalaries, PagingSalaries)));
        };
        this.table.load();
      });
  }

}
