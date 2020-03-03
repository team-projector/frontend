import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { R } from 'apollo-angular/types';
import { DEFAULT_FIRST, DEFAULT_OFFSET, isEqual, TableComponent, UI } from 'junte-ui';
import { of } from 'rxjs';
import { delay, distinctUntilChanged, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY } from 'src/consts';
import { field, model } from 'src/decorators/model';
import { environment } from 'src/environments/environment';
import { MeManager } from 'src/managers/me.manager';
import { DurationFormat } from 'src/models/enums/duration-format';
import { IssuesType } from 'src/models/enums/issue';
import { MilestoneProblem, MilestoneState, MilestoneType } from 'src/models/enums/milestone';
import { MilestonesFilter, MilestonesSummary, PagingMilestones } from 'src/models/milestone';
import { getMock } from 'src/utils/mocks';
import { AllMilestonesGQL, MilestonesSummaryGQL, SyncMilestoneGQL } from './milestones.graphql';

@model()
export class MilestonesState {

  @field()
  q?: string;

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  type?: IssuesType;

  constructor(defs: MilestonesState = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent implements OnInit {

  private _filter: MilestonesFilter;
  ui = UI;
  durationFormat = DurationFormat;
  milestoneProblem = MilestoneProblem;
  milestoneType = MilestoneType;
  milestoneState = MilestoneState;
  progress = {sync: false, summary: false};
  summary: MilestonesSummary;

  tableControl = this.builder.control({
    q: null,
    sort: null,
    first: DEFAULT_FIRST,
    offset: DEFAULT_OFFSET
  });

  form = this.builder.group({
    table: this.tableControl,
    type: [IssuesType.opened]
  });

  set filter(filter: MilestonesFilter) {
    this._filter = filter;
    this.load();
  }

  get filter() {
    return this._filter;
  }

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private allMilestonesGQL: AllMilestonesGQL,
              private syncMilestoneGQL: SyncMilestoneGQL,
              private milestonesSummaryGQL: MilestonesSummaryGQL,
              private builder: FormBuilder,
              private me: MeManager,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingMilestones, this.filter)).pipe(delay(MOCKS_DELAY))
        : this.allMilestonesGQL.fetch(this.filter as R)
          .pipe(map(({data: {allMilestones}}) =>
            deserialize(allMilestones, PagingMilestones)));
    };
    this.form.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({table: {offset, first, q}, type}) => {
        const state = new MilestonesState({
          q: q || undefined,
          first: first !== DEFAULT_FIRST ? first : undefined,
          offset: offset !== DEFAULT_OFFSET ? offset : undefined,
          type: type !== MilestoneType.opened ? type : undefined
        });

        this.filter = new MilestonesFilter({
          offset: offset,
          first: first,
          q: q,
          active: type === MilestoneType.opened ? true :
            type === MilestoneType.closed ? false : undefined
        });

        this.router.navigate([serialize(state)], {relativeTo: this.route})
          .then(() => null);
      });

    this.route.params.subscribe(({q, first, offset, type}) => {
      this.form.patchValue({
        table: {
          q: q || null,
          first: first || DEFAULT_FIRST,
          offset: offset || DEFAULT_OFFSET
        },
        type: type || IssuesType.opened
      });
    });
  }

  private load() {
    this.loadSummary();
    this.table.load();
  }

  loadSummary() {
    this.progress.summary = true;
    return (environment.mocks
      ? of(getMock(MilestonesSummary)).pipe(delay(MOCKS_DELAY))
      : this.milestonesSummaryGQL.fetch()
        .pipe(map(({data: {summary}}) =>
          deserialize(summary, MilestonesSummary))))
      .pipe(finalize(() => this.progress.summary = false))
      .subscribe(summary => this.summary = summary);
  }

  sync(issue: number) {
    this.progress.sync = true;
    this.syncMilestoneGQL.mutate({id: issue})
      .pipe(finalize(() => this.progress.sync = false))
      .subscribe(() => this.table.load());
  }
}
