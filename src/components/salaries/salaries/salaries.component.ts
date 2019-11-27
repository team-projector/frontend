import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { R } from 'apollo-angular/types';
import { DEFAULT_FIRST, DEFAULT_OFFSET, defined, isEqual, TableComponent, UI } from 'junte-ui';
import merge from 'merge-anything';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { PagingSalaries, SalariesFilter } from 'src/models/salary';
import { AllSalariesGQL } from './salaries.graphql';

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.scss']
})
export class SalariesComponent implements OnInit {

  private filter$ = new BehaviorSubject<SalariesFilter>(null);
  ui = UI;

  tableControl = this.builder.control({
    q: null,
    sort: null,
    first: DEFAULT_FIRST,
    offset: DEFAULT_OFFSET
  });

  form = this.builder.group({
    table: this.tableControl
  });

  @Input() user: number;

  @Input()
  set filter(filter: SalariesFilter) {
    this.filter$.next(filter);
  }

  get filter() {
    return this.filter$.getValue();
  }

  // TODO: @ViewChild(TableComponent) == undefined in AOT
  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private allSalaries: AllSalariesGQL,
              private builder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return this.allSalaries.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {allSalaries}}: { data: { allSalaries } }) =>
          deserialize(allSalaries, PagingSalaries)));
    };

    this.form.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({table: {offset, first}}) => this.save(offset, first));

    this.route.params.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({first, offset}) => {
        if (!!this.filter && this.filter.user != this.user) {
          offset = 0;
        }
        const form = merge({extensions: [defined]}, this.form.getRawValue(), {
          table: {first: +first || DEFAULT_FIRST, offset: +offset || DEFAULT_OFFSET}
        });
        this.filter = new SalariesFilter({user: this.user, ...form.table});
        this.form.patchValue(form, {emitEvent: false});
      });

    this.filter$.pipe(
      distinctUntilChanged((val1, val2) => isEqual(val1, val2))
    ).subscribe(() => this.table.load());
  }

  save(offset, first) {
    const filter: { first?, offset? } = {};
    if (offset !== DEFAULT_OFFSET) {
      filter.offset = offset;
    }
    if (first !== DEFAULT_FIRST) {
      filter.first = first;
    }

    this.router.navigate([filter], {relativeTo: this.route}).then(() => null);
  }

}
