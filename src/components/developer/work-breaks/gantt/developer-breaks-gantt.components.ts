import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { AllWorkBreaks } from 'src/components/shared/work-breaks/list/work-breaks-list.graphql';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { ApproveStates, BreakReasons } from 'src/models/enums/break';
import { ViewType } from 'src/models/enums/view-type';
import { BackendError } from 'src/types/gql-errors';
import { User } from 'src/models/user';
import { PagingBreaks } from 'src/models/work-break';
import { getMock } from 'src/utils/mocks';

@Component({
  selector: 'app-breaks-gantt',
  templateUrl: './developer-breaks-gantt.components.html',
  styleUrls: ['./developer-breaks-gantt.components.scss']
})
export class DeveloperWorkBreaksGanttComponent implements OnInit {

  user: User;
  ui = UI;
  viewType = ViewType;
  reasons = BreakReasons;
  approveStates = ApproveStates;
  workbreaks = [];
  errors: BackendError[] = [];
  loading = false;

  constructor(private breaksGQL: AllWorkBreaks,
              private route: ActivatedRoute) {
    route.data.subscribe(({user}) => this.user = user);
  }

  ngOnInit() {
    this.loadBreaks();
  }

  loadBreaks() {
    this.loading = true;
    (environment.mocks
      ? of(getMock(PagingBreaks, {user: this.user.id})).pipe(delay(MOCKS_DELAY))
      : this.breaksGQL.fetch({user: this.user.id} as R).pipe(
        map(({data: {breaks}}) => deserialize(breaks, PagingBreaks))))
      .pipe(finalize(() => this.loading = false))
      .subscribe(ganttBreaks => this.workbreaks = ganttBreaks.results,
        err => this.errors = err);
  }
}
