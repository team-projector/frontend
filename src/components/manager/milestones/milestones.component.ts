import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent, UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { MilestoneProblem, MilestoneState, MilestoneType } from 'src/models/enums/milestone';
import { GqlError } from 'src/models/gql-errors';
import { MilestonesFilter, MilestonesSummary, PagingMilestones } from 'src/models/milestone';
import { getMock } from 'src/utils/mocks';
import { LocalUI } from '../../../enums/local-ui';
import { equals } from '../../../utils/equals';
import { AllMilestonesGQL, MilestonesSummaryGQL, SyncMilestoneGQL } from './milestones.graphql';
import { MilestonesState, MilestonesStateUpdate } from './milestones.types';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent implements OnInit {

  ui = UI;
  localUi = LocalUI;
  durationFormat = DurationFormat;
  milestoneProblem = MilestoneProblem;
  milestoneType = MilestoneType;
  milestoneState = MilestoneState;
  errors: GqlError[] = [];

  // will be used for reset offset
  private reset: Object;

  progress = {sync: false, summary: false};

  filter: MilestonesFilter;
  summary: MilestonesSummary;

  tableControl = this.fb.control({
    q: null,
    first: PAGE_SIZE,
    offset: 0
  });
  form = this.fb.group({
    table: this.tableControl,
    type: [MilestoneType.active]
  });

  set state({first, offset, q, type}: MilestonesState) {
    this.form.patchValue({
      table: {
        q: q || null,
        first: first || PAGE_SIZE,
        offset: offset || 0
      },
      type: type || MilestoneType.active
    }, {emitEvent: false});

    this.load();
  }

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private allMilestonesGQL: AllMilestonesGQL,
              private syncMilestoneGQL: SyncMilestoneGQL,
              private milestonesSummaryGQL: MilestonesSummaryGQL,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private logger: NGXLogger) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingMilestones, this.filter)).pipe(delay(MOCKS_DELAY))
        : this.allMilestonesGQL.fetch(serialize(this.filter) as R)
          .pipe(map(({data: {milestones}}) =>
            deserialize(milestones, PagingMilestones)));
    };
    this.form.valueChanges.subscribe(() => {
      this.logger.debug('form state was changed');
      this.load();
    });

    this.route.params.subscribe(({q, first, offset, type}) => {
      this.logger.debug('read state from route');
      this.state = {
        q: q || null,
        first: +first || PAGE_SIZE,
        offset: +offset || 0,
        type: type || MilestoneType.active
      };
    });

    // this.table.load();
  }

  private load() {
    const {table: {first, q}, type} = this.form.getRawValue();
    const filter = new MilestonesFilter({
      first: first,
      q: q,
      state: type === MilestoneType.active ? MilestoneState.active :
        type === MilestoneType.closed ? MilestoneState.closed : undefined,
      orderBy: type === MilestoneType.active ? 'dueDate' : '-dueDate'
    });
    const reset = serialize(filter);
    if (!!this.reset && !equals(reset, this.reset)) {
      this.logger.debug('reset offset');
      this.tableControl.setValue({q, first, offset: 0}, {emitEvent: false});
    }
    this.reset = reset;

    const {table: {offset}} = this.form.getRawValue();
    filter.offset = offset;

    if (equals(filter, this.filter)) {
      this.logger.debug('filter was not changed');
      return;
    }
    this.filter = filter;

    this.logger.debug('load milestones', this.filter);
    this.loadSummary();
    if (!!this.table) {
      this.table.load();
    }

    const state = new MilestonesStateUpdate({
      q: q || undefined,
      first: first !== PAGE_SIZE ? first : undefined,
      offset: offset !== 0 ? offset : undefined,
      type: type !== MilestoneType.active ? type : undefined
    });

    this.router.navigate([serialize(state)],
      {relativeTo: this.route}).then(() => null);
  }

  loadSummary() {
    this.progress.summary = true;
    return (environment.mocks
      ? of(getMock(MilestonesSummary)).pipe(delay(MOCKS_DELAY))
      : this.milestonesSummaryGQL.fetch()
        .pipe(map(({data: {summary}}) =>
          deserialize(summary, MilestonesSummary))))
      .pipe(finalize(() => this.progress.summary = false))
      .subscribe(summary => this.summary = summary,
        err => this.errors = err);
  }

  sync(issue: number) {
    this.progress.sync = true;
    this.syncMilestoneGQL.mutate({id: issue})
      .pipe(finalize(() => this.progress.sync = false))
      .subscribe(() => this.table.load(),
        err => this.errors = err);
  }

}
