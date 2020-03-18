import { Component, ComponentFactoryResolver, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { DEFAULT_FIRST, DEFAULT_OFFSET, isEqual, ModalOptions, ModalService, TableComponent, UI } from 'junte-ui';
import { of } from 'rxjs';
import { delay, distinctUntilChanged, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { BreakDeclineComponent } from 'src/components/breaks/break-decline/break-decline.component';
import { BreakEditComponent } from 'src/components/breaks/break-edit/break-edit.component';
import { AllWorkBreaks, ApproveWorkBreakGQL, DeleteWorkBreakGQL } from 'src/components/breaks/breaks/breaks.graphql';
import { MOCKS_DELAY } from 'src/consts';
import { field, model } from 'src/decorators/model';
import { environment } from 'src/environments/environment';
import { MeManager } from 'src/managers/me.manager';
import { Break, BreaksFilter, PagingBreaks } from 'src/models/break';
import { ApproveStates, BreakReasons } from 'src/models/enums/break';
import { ViewType } from 'src/models/enums/view-type';
import { IssuesFilter } from 'src/models/issue';
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
  selector: 'app-breaks',
  templateUrl: './breaks.component.html',
  styleUrls: ['./breaks.component.scss']
})
export class BreaksComponent implements OnInit {

  private _filter: BreaksFilter;
  user: User;
  ui = UI;
  viewType = ViewType;
  reasons = BreakReasons;
  approveStates = ApproveStates;
  breaks: Break[] = [];
  loading = false;

  tableControl = this.fb.control({
    q: null,
    sort: null,
    first: DEFAULT_FIRST,
    offset: DEFAULT_OFFSET
  });

  teamControl = this.fb.control(null);

  form = this.fb.group({
    table: this.tableControl,
    user: [null],
    team: this.teamControl
  });


  set filter(filter: IssuesFilter) {
    this._filter = filter;
    this.table.load();
  }

  get filter() {
    return this._filter;
  }

  @Input() view = ViewType.default;

  @Input() set state({first, offset, q, team, user}: BreaksState) {
    this.form.patchValue({
      table: {
        q: q || null,
        first: first || DEFAULT_FIRST,
        offset: offset || DEFAULT_OFFSET
      },
      team: team || null,
      user: user || null
    });
  }

  @Output() stateChange = new EventEmitter<BreaksState>();
  @Output() reloaded = new EventEmitter();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private breaksGQL: AllWorkBreaks,
              private deleteBreakGQL: DeleteWorkBreakGQL,
              private approveBreakGQL: ApproveWorkBreakGQL,
              private fb: FormBuilder,
              private injector: Injector,
              private cfr: ComponentFactoryResolver,
              private modalService: ModalService,
              public me: MeManager) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingBreaks)).pipe(delay(MOCKS_DELAY))
        : this.breaksGQL.fetch(this.filter as R)
          .pipe(map(({data: {breaks}}) => deserialize(breaks, PagingBreaks)));
    };

    this.form.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({table: {offset, first, q}, team, user}) => {
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

  open(workBreak: Break = null) {
    const component = this.cfr.resolveComponentFactory(BreakEditComponent).create(this.injector);
    const options = new ModalOptions({title: {text: $localize`:@@label.add_break:Add break`}});
    this.modalService.open(component, options);
    component.instance.break = workBreak;
    component.instance.view = this.view;
    if (this.view === ViewType.extended) {
      component.instance.team = this.teamControl.value;
    }
    component.instance.saved.subscribe(() => {
      this.modalService.close();
      this.table.load();
    });
  }

  delete(id: string) {
    (environment.mocks ? of(null) : this.deleteBreakGQL.fetch({id}))
      .subscribe(() => this.table.load());
  }

  approve(id: string) {
    (environment.mocks ? of(null) : this.approveBreakGQL.fetch({id}))
      .subscribe(() => this.table.load());
  }

  openDecline(workBreak: Break = null) {
    const component = this.cfr.resolveComponentFactory(BreakDeclineComponent).create(this.injector);
    const options = new ModalOptions({title: {text: $localize`:@@label.decline_break:Decline break`}});
    this.modalService.open(component, options);
    component.instance.break = workBreak;
    component.instance.saved.subscribe(() => {
      this.modalService.close();
      this.table.load();
    });
  }
}
