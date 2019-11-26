import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { R } from 'apollo-angular/types';
import { DEFAULT_FIRST, DEFAULT_OFFSET, defined, isEqual, TableComponent, TableFeatures, UI } from 'junte-ui';
import merge from 'merge-anything';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, finalize, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { MilestoneProblem, MilestonesFilter, PagingMilestones } from 'src/models/milestone';
import { DurationFormat } from 'src/pipes/date';
import { AllMilestonesGQL, SyncMilestoneGQL } from './milestones.graphql';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent implements OnInit {

  private filter$ = new BehaviorSubject<MilestonesFilter>(null);
  ui = UI;
  durationFormat = DurationFormat;
  features = TableFeatures;
  milestoneProblem = MilestoneProblem;
  progress = {sync: false};

  tableControl = this.builder.control({
    q: null,
    sort: null,
    first: DEFAULT_FIRST,
    offset: DEFAULT_OFFSET
  });

  form = this.builder.group({
    table: this.tableControl
  });

  @Input()
  set filter(filter: MilestonesFilter) {
    this.filter$.next(filter);
  }

  get filter() {
    return this.filter$.getValue();
  }

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private allMilestonesGQL: AllMilestonesGQL,
              private syncMilestoneGQL: SyncMilestoneGQL,
              private builder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return this.allMilestonesGQL.fetch(this.filter as R)
        .pipe(map(({data: {allMilestones}}) =>
          deserialize(allMilestones, PagingMilestones)));
    };

    this.form.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({table: {offset, first, q}}) => this.save(offset, first, q));

    this.route.params.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({first, offset, q}) => {
        const form = merge({extensions: [defined]}, this.form.getRawValue(), {
          table: {first: +first || DEFAULT_FIRST, offset: +offset || DEFAULT_OFFSET, q}
        });
        this.filter = new MilestonesFilter(form.table);
        this.form.patchValue(form, {emitEvent: false});
      });

    this.filter$.pipe(
      distinctUntilChanged((val1, val2) => isEqual(val1, val2))
    ).subscribe(() => this.table.load());
  }

  save(offset, first, q) {
    const filter: { first?, offset?, q? } = {};
    const params = this.route.snapshot.params;

    if (offset !== DEFAULT_OFFSET) {
      filter.offset = offset;
    }
    if (first !== DEFAULT_FIRST) {
      filter.first = first;
    }
    if (!!q) {
      filter.q = q;
    }
    if (q != params.q && (q !== '' || !!params.q)) {
      delete filter.offset;
    }

    this.router.navigate([filter], {relativeTo: this.route}).then(() => null);
  }

  sync(issue: number) {
    this.progress.sync = true;
    this.syncMilestoneGQL.mutate({id: issue})
      .pipe(finalize(() => this.progress.sync = false))
      .subscribe(() => this.table.load());
  }
}
