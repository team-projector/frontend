import { Component, ComponentFactoryResolver, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { R } from 'apollo-angular/types';
import { DefaultSearchFilter, ModalOptions, ModalService, TableComponent, TableFeatures, UI } from 'junte-ui';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { BreakEditComponent } from 'src/components/developer/breaks/break-edit/break-edit.component';
import { PLATFORM_DELAY } from 'src/consts';
import { BreaksFilter, BreakState, BreaksType, PagingBreaks } from 'src/models/break';
import { BreaksGQL } from './breaks.graphql';

export enum ViewType {
  default,
  extended
}

@Component({
  selector: 'app-breaks',
  templateUrl: './breaks.component.html',
  styleUrls: ['./breaks.component.scss']
})

export class BreaksComponent implements OnInit {

  private user$ = new BehaviorSubject<string>(null);
  private type$ = new BehaviorSubject<BreaksType>(BreaksType.created);

  ui = UI;
  breaksState = BreakState;
  breaksType = BreaksType;
  viewType = ViewType;
  features = TableFeatures;

  tableControl = new FormControl(BreaksType.created);

  form: FormGroup = this.formBuilder.group({
    table: this.tableControl
  });

  @Input() view = ViewType.default;
  @Input() draggable = false;
  @Output() reloaded = new EventEmitter();
  @Output() filtered = new EventEmitter<{ type? }>();


  @Input()
  set user(user: string) {
    this.user$.next(user);
  }

  get user() {
    return this.user$.getValue();
  }


  @Input()
  set type(type: BreaksType) {
    this.type$.next(type);
  }

  get type() {
    return this.type$.getValue();
  }

  filter: BreaksFilter = new BreaksFilter();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private breaksGQL: BreaksGQL,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private injector: Injector,
              private cfr: ComponentFactoryResolver,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.type$.subscribe(type => this.tableControl.patchValue(type, {emitEvent: false}));

    this.table.fetcher = (filter: DefaultSearchFilter) => {
      this.filter.first = filter.first;
      this.filter.offset = filter.offset;
      return this.breaksGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {breaks}}) => {
          console.log(deserialize(breaks, PagingBreaks));
          return deserialize(breaks, PagingBreaks);
        }));
    };

    combineLatest(this.user$, this.type$, this.route.params)
      .pipe(debounceTime(PLATFORM_DELAY), distinctUntilChanged())
      .subscribe(([user, type]) => {
        this.filter.user = user;
        this.filter.state = type === BreaksType.created ? BreakState.created
          : (type === BreaksType.decline ? BreakState.decline : null);

        this.table.load();
      });

    this.form.valueChanges.pipe(distinctUntilChanged())
      .subscribe(({type}) => {
        const state: { type? } = {};
        if (type !== BreaksType.created) {
          state.type = type;
        }
        this.filtered.emit(state);
      });
  }

  open() {
    const component = this.cfr.resolveComponentFactory(BreakEditComponent).create(this.injector);
    this.modalService.open(component, new ModalOptions({title: 'Edit break'}));
  }

}
