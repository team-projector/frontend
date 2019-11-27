import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { R } from 'apollo-angular/types';
import { DEFAULT_FIRST, DEFAULT_OFFSET, defined, isEqual, TableComponent, UI } from 'junte-ui';
import merge from 'merge-anything';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { IssueState } from 'src/models/issue';
import { MergeRequestState } from 'src/models/merge-request';
import { PagingTimeExpenses, SpentTimesSummary, TimeExpensesFilter, TimeExpensesState } from 'src/models/spent-time';
import { TimeExpensesGQL, TimeExpensesSummaryGQL } from './time-expenses.graphql';

@Component({
  selector: 'app-time-expenses',
  templateUrl: './time-expenses.component.html',
  styleUrls: ['./time-expenses.component.scss']
})
export class TimeExpensesComponent implements OnInit {

  ui = UI;
  issuesState = IssueState;
  timeExpensesState = TimeExpensesState;
  summary: SpentTimesSummary;

  stateControl = this.builder.control(TimeExpensesState.opened);
  tableControl = this.builder.control({
    q: null,
    sort: null,
    first: DEFAULT_FIRST,
    offset: DEFAULT_OFFSET
  });
  form = this.builder.group({
    state: this.stateControl,
    table: this.tableControl
  });

  filter: TimeExpensesFilter;

  @Input() user: string;
  @Output() reloaded = new EventEmitter();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private timeExpensesGQL: TimeExpensesGQL,
              private TimeExpensesSummaryGQL: TimeExpensesSummaryGQL,
              private builder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return this.timeExpensesGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {allSpentTimes}}) => deserialize(allSpentTimes, PagingTimeExpenses)));
    };

    this.form.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({table: {offset, first, sort}, state}) => this.save(offset, first, sort, state));

    this.route.params.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({sort, first, offset, state, team, user, project, due_date, salary}) => {
        if (!!this.filter && (this.filter.team != team || this.filter.user != (user || this.user)
          || this.filter.date != due_date || this.filter.salary != salary || this.filter.project != project)) {
          offset = 0;
        }
        const form = merge({extensions: [defined]}, this.form.getRawValue(), {
          table: {sort, first: +first || DEFAULT_FIRST, offset: +offset || DEFAULT_OFFSET},
          state: state || MergeRequestState.opened
        });
        const filter = {team, user: user || this.user, project, date: due_date, salary};
        this.filter = new TimeExpensesFilter({...filter, ...form.table, state: form.state});
        this.loadSummary();
        this.table.load();
        this.form.patchValue(form, {emitEvent: false});
      });
  }

  save(offset, first, sort, state: TimeExpensesState) {
    const filter: { sort?, first?, offset?, state? } = {};
    const params = this.route.snapshot.params;
    if (offset !== DEFAULT_OFFSET) {
      filter.offset = offset;
    }
    if (first !== DEFAULT_FIRST) {
      filter.first = first;
    }
    if (!!sort) {
      filter.sort = sort;
    }

    if (!!state && state !== TimeExpensesState.opened) {
      filter.state = state;
    }
    if (state != params.state && (state !== TimeExpensesState.opened || !!params.state)) {
      delete filter.offset;
    }

    if (!!params.user) {
      this.filter.user = params.user;
    }
    if (!!params.project) {
      this.filter.project = params.project;
    }
    if (!!params.salary) {
      this.filter.salary = params.salary;
    }
    this.router.navigate([filter], {relativeTo: this.route}).then(() => null);
  }

  loadSummary() {
    this.TimeExpensesSummaryGQL.fetch(serialize(this.filter) as R)
      .pipe(map(({data: {spentTimes}}) => deserialize(spentTimes, SpentTimesSummary)))
      .subscribe(summary => this.summary = summary);
  }
}
