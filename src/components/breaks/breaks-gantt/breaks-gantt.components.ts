import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DEFAULT_FIRST, DEFAULT_OFFSET, isEqual, PopoverComponent, UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { of } from 'rxjs';
import { delay, distinctUntilChanged, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { AllWorkBreaks, ApproveWorkBreakGQL, DeleteWorkBreakGQL } from 'src/components/breaks/breaks.graphql';
import { MOCKS_DELAY } from 'src/consts';
import { field, model } from 'src/decorators/model';
import { environment } from 'src/environments/environment';
import { MeManager } from 'src/managers/me.manager';
import { Break, BreaksFilter, PagingBreaks } from 'src/models/break';
import { ApproveStates, BreakReasons } from 'src/models/enums/break';
import { ViewType } from 'src/models/enums/view-type';
import { User } from 'src/models/user';
import { getMock } from 'src/utils/mocks';

@model()
export class BreaksState {

  @field()
  q?: string;

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  user?: number;

  @field()
  team?: string;

  constructor(defs: BreaksState = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@Component({
  selector: 'app-breaks-gantt',
  templateUrl: './breaks-gantt.components.html',
  styleUrls: ['./breaks-gantt.components.scss']
})
export class BreaksGanttComponent implements OnInit {

  private _filter: BreaksFilter;
  user: User;
  ui = UI;
  viewType = ViewType;
  reasons = BreakReasons;
  approveStates = ApproveStates;
  breaks: Break[] = [];
  popover: PopoverComponent;

  ganttBreaks: Break[] = [];
  loading = false;

  viewControl = this.fb.control({
    q: null,
    first: DEFAULT_FIRST,
    offset: DEFAULT_OFFSET
  });

  teamControl = this.fb.control(null);

  form = this.fb.group({
    view: this.viewControl,
    user: [null],
    team: this.teamControl
  });

  set filter(filter: BreaksFilter) {
    console.log(filter);
    this._filter = filter;
    this.loadBreaks();
  }

  get filter() {
    return this._filter;
  }

  @Input() view = ViewType.default;

  @Input() set state({first, offset, q, team, user}: BreaksState) {
    this.form.setValue({
      view: {
        q: q || null,
        first: first || DEFAULT_FIRST,
        offset: offset || DEFAULT_OFFSET
      },
      team: team || null,
      user: user || null
    });
  }

  @Output() stateChange = new EventEmitter<BreaksState>();

  constructor(private breaksGQL: AllWorkBreaks,
              private deleteBreakGQL: DeleteWorkBreakGQL,
              private approveBreakGQL: ApproveWorkBreakGQL,
              private fb: FormBuilder,
              public me: MeManager) {
  }

  ngOnInit() {
    this.loadBreaks();
    this.form.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({view: {offset, first, q}, team, user}) => {
        this.stateChange.emit(new BreaksState({
          q: q || undefined,
          first: first !== DEFAULT_FIRST ? first : undefined,
          offset: offset !== DEFAULT_OFFSET ? offset : undefined,
          user: user || undefined,
          team: team || undefined
        }));

        this.filter = new BreaksFilter({
          q: q,
          offset: offset,
          first: first,
          user: user,
          team: team
        });
      });
  }

  loadBreaks() {
    this.loading = true;
    (environment.mocks
      ? of(getMock(PagingBreaks, this.filter)).pipe(delay(MOCKS_DELAY))
      : this.breaksGQL.fetch(serialize(this.filter) as R).pipe(
        map(({data: {breaks}}) => deserialize(breaks, PagingBreaks))))
      .pipe(finalize(() => this.loading = false))
      .subscribe(ganttBreaks => [this.ganttBreaks = ganttBreaks.results, console.log(this.ganttBreaks)]);
  }
}
