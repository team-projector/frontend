import { Component, ComponentFactoryResolver, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalOptions, ModalService, TableComponent, UI, untilJSONChanged } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { AllWorkBreaks, ApproveWorkBreakGQL, DeleteWorkBreakGQL } from 'src/components/shared/work-breaks/list/work-breaks-list.graphql';
import { BreakDeclineComponent } from 'src/components/shared/work-breaks/decline/break-decline.component';
import { BreakEditComponent } from 'src/components/shared/work-breaks/edit/break-edit.component';
import { MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { ApproveStates, BreakReasons } from 'src/models/enums/break';
import { ViewType } from 'src/models/enums/view-type';
import { BreaksFilter, PagingBreaks, WorkBreak } from 'src/models/work-break';
import { getMock } from 'src/utils/mocks';
import { LocalUI } from '../../../../enums/local-ui';
import { Team } from '../../../../models/team';
import { Me } from '../../../../models/user';
import { BreaksState, BreaksStateUpdate } from './work-breaks-list-types';

const DEFAULT_FIRST = 10;

@Component({
  selector: 'app-breaks-list',
  templateUrl: './work-breaks-list.component.html',
  styleUrls: ['./work-breaks-list.component.scss']
})
export class WorkBreaksListComponent implements OnInit {

  ui = UI;
  viewType = ViewType;
  reasons = BreakReasons;
  approveStates = ApproveStates;

  filter: BreaksFilter;
  breaks: WorkBreak[] = [];
  team: Team;

  loading = false;

  tableControl = this.fb.control({
    first: DEFAULT_FIRST,
    offset: 0
  });

  form = this.fb.group({
    table: this.tableControl,
    user: [null],
    team: [null],
  });

  @Input()
  view = ViewType.default;

  @Input()
  set state({first, offset, team, user}: BreaksState) {
    this.team = team;
    this.form.patchValue({
      view: {
        first: first || DEFAULT_FIRST,
        offset: offset || 0
      },
      team: team?.id || null,
      user: user?.id || null
    }, {emitEvent: false});
  }

  @Input()
  me: Me;

  @Output()
  filtered = new EventEmitter<BreaksStateUpdate>();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private breaksGQL: AllWorkBreaks,
              private deleteBreakGQL: DeleteWorkBreakGQL,
              private approveBreakGQL: ApproveWorkBreakGQL,
              private fb: FormBuilder,
              private injector: Injector,
              private cfr: ComponentFactoryResolver,
              private modal: ModalService) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingBreaks)).pipe(delay(MOCKS_DELAY))
        : this.breaksGQL.fetch(this.filter as R)
          .pipe(delay(UI_DELAY), map(({data: {breaks}}) => deserialize(breaks, PagingBreaks)));
    };

    this.form.valueChanges.subscribe(({table: {offset, first}, team, user}) => {
      this.filtered.emit(new BreaksStateUpdate({
        first: first !== DEFAULT_FIRST ? first : undefined,
        offset: offset !== 0 ? offset : undefined,
        user: user || undefined,
        team: team || undefined
      }));
      this.load();
    });

    this.load();
  }

  load() {
    const {table: {offset, first}, user, team} = this.form.getRawValue();
    this.filter = new BreaksFilter({
      offset: offset,
      first: first,
      user: user,
      team: team
    });
    this.table.load();
  }

  open(workBreak: WorkBreak = null) {
    const component = this.cfr.resolveComponentFactory(BreakEditComponent).create(this.injector);
    component.instance.view = this.view;
    component.instance.user = this.me;
    if (!!workBreak) {
      component.instance.break = workBreak;
    }
    if (this.view === ViewType.default) {
      component.instance.team = this.team;
    }

    const options = {title: {icon: LocalUI.icons.workBreak, text: $localize`:@@label.add_break:Add break`}};
    this.modal.open(component, options);
    component.instance.saved.subscribe(() => {
      this.modal.close();
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

  openDecline(workBreak: WorkBreak = null) {
    const component = this.cfr.resolveComponentFactory(BreakDeclineComponent).create(this.injector);
    const options = new ModalOptions({title: {text: $localize`:@@label.decline_break:Decline break`}});
    this.modal.open(component, options);
    component.instance.break = workBreak;
    component.instance.saved.subscribe(() => {
      this.modal.close();
      this.table.load();
    });
  }
}