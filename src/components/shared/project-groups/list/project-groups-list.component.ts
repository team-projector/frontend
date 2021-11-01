import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TableComponent, UI } from '@esanum/ui';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { serialize } from '@junte/serialize-ts';
import { deserialize } from '@junte/serialize-ts';
import { MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { catchGQLErrors } from 'src/utils/gql-errors';
import { getMock } from '@junte/mocker';
import { LocalUI } from 'src/enums/local-ui';
import { ProjectState, ProjectType } from 'src/models/enums/project';
import { ViewType } from 'src/models/enums/view-type';
import { ProjectGroupsPaging, ProjectsFilter, ProjectsSummary } from 'src/models/project';
import { BackendError } from 'src/types/gql-errors';
import { equals } from 'src/utils/equals';
import { AllProjectGroupsGQL, ProjectGroupsSummaryGQL } from './project-groups-list.graphql';
import { ProjectGroupsState, ProjectGroupsStateUpdate } from './project-groups-list.types';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-project-groups',
  templateUrl: './project-groups-list.component.html',
  styleUrls: ['./project-groups-list.component.scss']
})
export class ProjectGroupsListComponent implements OnInit {

  ui = UI;
  localUi = LocalUI;
  viewType = ViewType;
  projectType = ProjectType;

  // will be used for reset offset
  private reset: Object;

  progress = {
    summary: false
  };
  errors: BackendError[] = [];

  filter: ProjectsFilter;
  summary: ProjectsSummary;

  tableControl = this.fb.control({
    first: PAGE_SIZE,
    offset: 0
  });
  form = this.fb.group({
    table: this.tableControl,
    type: [ProjectType.developing]
  });

  @Input()
  set state({type, first, offset}: ProjectGroupsState) {
    this.logger.debug('set state');
    this.form.patchValue({
      table: {
        first: first || PAGE_SIZE,
        offset: offset || 0
      },
      type: type || ProjectType.developing,
    }, {emitEvent: false});

    this.load();
  }

  @Output()
  filtered = new EventEmitter<ProjectGroupsStateUpdate>();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private allProjectGroupsGQL: AllProjectGroupsGQL,
              private projectsSummaryGQL: ProjectGroupsSummaryGQL,
              private fb: FormBuilder,
              private logger: NGXLogger) {

  }

  ngOnInit() {
    this.tableControl.valueChanges.subscribe(() =>
      this.logger.debug('table control was changed'));

    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(ProjectGroupsPaging)).pipe(delay(MOCKS_DELAY))
        : this.allProjectGroupsGQL.fetch(this.filter)
          .pipe(delay(UI_DELAY), catchGQLErrors(), map(({data: {groups}}) =>
            deserialize(groups, ProjectGroupsPaging)));
    };

    this.form.valueChanges.subscribe(() => {
      this.logger.debug('form state was changed');
      this.load();
    });
    this.table.load();
  }

  private load() {
    const {table: {first}, type} = this.form.getRawValue();
    const filter = new ProjectsFilter({
      first: first,
      state: [type === ProjectType.developing ? ProjectState.developing :
        (type === ProjectType.supporting ? ProjectState.supporting
          : (type === ProjectType.archived ? ProjectState.archived : null))],
    });
    const reset = serialize(filter);
    if (!!this.reset && !equals(reset, this.reset)) {
      this.logger.debug('reset offset');
      this.tableControl.setValue({first, offset: 0}, {emitEvent: false});
    }
    this.reset = reset;

    const {table: {offset}} = this.form.getRawValue();
    filter.offset = offset;

    if (equals(filter, this.filter)) {
      this.logger.debug('filter was not changed');
      return;
    }
    this.filter = filter;

    this.logger.debug('load projects', this.filter);
    this.loadSummary();
    if (!!this.table) {
      this.table.load();
    }

    this.filtered.emit(new ProjectGroupsStateUpdate({
      first: first !== PAGE_SIZE ? first : undefined,
      offset: offset !== 0 ? offset : undefined,
      type: type !== ProjectType.developing ? type : undefined
    }));
  }

  loadSummary() {
    this.logger.debug('load summary');
    this.progress.summary = true;
    return (environment.mocks
      ? of(getMock(ProjectsSummary)).pipe(delay(MOCKS_DELAY))
      : this.projectsSummaryGQL.fetch()
        .pipe(map(({data: {summary}}) =>
          deserialize(summary, ProjectsSummary))))
      .pipe(delay(UI_DELAY), finalize(() => this.progress.summary = false))
      .subscribe(summary => this.summary = summary,
        err => this.errors = err);
  }

}
