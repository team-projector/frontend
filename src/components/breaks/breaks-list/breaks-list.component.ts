import { Component, ComponentFactoryResolver, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { field, model } from '@junte/mocker-library';
import { R } from 'apollo-angular/types';
import { DEFAULT_FIRST, DEFAULT_OFFSET, isEqual, ModalOptions, ModalService, TableComponent, TableFeatures, UI } from 'junte-ui';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { BreakEditComponent } from 'src/components/breaks/break-edit/break-edit.component';
import { BreaksGQL, DeleteBreakGQL } from 'src/components/breaks/breaks-list/breaks-list.graphql';
import { MeManager } from 'src/managers/me.manager';
import { Break, BreaksFilter, PagingBreaks } from 'src/models/break';
import { IssuesFilter } from 'src/models/issue';
import { User, UserRole } from 'src/models/user';

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

  constructor(defs: BreaksState = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@Component({
  selector: 'app-breaks-list',
  templateUrl: './breaks-list.component.html',
  styleUrls: ['./breaks-list.component.scss']
})
export class BreaksListComponent implements OnInit {

  private _filter: BreaksFilter;
  userRole = UserRole;
  user: User;
  ui = UI;
  features = TableFeatures;
  breaks: Break[] = [];
  loading = false;
  progress = {delete: false};

  tableControl = this.builder.control({
    q: null,
    sort: null,
    first: DEFAULT_FIRST,
    offset: DEFAULT_OFFSET
  });

  form = this.builder.group({
    table: this.tableControl,
    user: [null]
  });

  @Output() reloaded = new EventEmitter();

  @ViewChild('table', {static: true})
  table: TableComponent;

  set filter(filter: IssuesFilter) {
    this._filter = filter;
    this.table.load();
  }

  get filter() {
    return this._filter;
  }

  constructor(private breaksGQL: BreaksGQL,
              private deleteBreakGQL: DeleteBreakGQL,
              private builder: FormBuilder,
              private route: ActivatedRoute,
              private injector: Injector,
              private cfr: ComponentFactoryResolver,
              private modalService: ModalService,
              public me: MeManager,
              private router: Router) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return this.breaksGQL.fetch(this.filter as R)
        .pipe(map(({data: {breaks}}) =>
          deserialize(breaks, PagingBreaks)));
    };

    this.form.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({table: {offset, first, q}, user}) => {
        const state = new BreaksState({
          q: q || undefined,
          first: first !== DEFAULT_FIRST ? first : undefined,
          offset: offset !== DEFAULT_OFFSET ? offset : undefined
        });

        this.filter = new BreaksFilter({
          q: q,
          offset: offset,
          first: first,
          user: user
        });

        this.router.navigate([serialize(state)], {relativeTo: this.route})
          .then(() => null);
      });

    combineLatest([this.route.data, this.route.params])
      .subscribe(([{user}, {q, first, offset}]) => {
        this.form.patchValue({
          table: {
            q: q || null,
            first: first || DEFAULT_FIRST,
            offset: offset || DEFAULT_OFFSET
          },
          user: !!user ? user.id : user
        });
      });
  }

  open(workBreak: Break = null) {
    const component = this.cfr.resolveComponentFactory(BreakEditComponent).create(this.injector);
    const options = new ModalOptions({title: {text: 'Add break'}});
    this.modalService.open(component, options);
    component.instance.break = workBreak;
    component.instance.saved.subscribe(() => {
      this.modalService.close();
      this.table.load();
    });
  }

  delete(id: string) {
    this.progress.delete = true;
    this.deleteBreakGQL.fetch({id})
      .pipe(finalize(() => this.progress.delete = false))
      .subscribe(() => this.table.load());
  }

}
