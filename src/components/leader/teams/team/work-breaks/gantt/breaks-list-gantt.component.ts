import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY } from 'src/consts';
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { field, model } from 'src/decorators/model';
import { environment } from 'src/environments/environment';
import { ApproveStates } from 'src/models/enums/break';
import { ViewType } from 'src/models/enums/view-type';
import { BackendError } from 'src/types/gql-errors';
import { User, UsersPaging } from 'src/models/user';
import { getMock } from 'src/utils/mocks';
import { CardSize } from '../../../../../shared/users/card/user-card.types';
import { AllTeamWorkBreaks } from './breaks-gantt.graphql';

const PAGE_SIZE = 10;

@model()
export class TeamGanttFilter {

  @field()
  first: number;

  @field()
  offset: number;

  @field()
  team: string;

  constructor(defs: Partial<TeamGanttFilter> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@Component({
  selector: 'app-team-breaks-list-gantt',
  templateUrl: './breaks-list-gantt.components.html',
  styleUrls: ['./breaks-list-gantt.components.scss']
})
export class TeamBreaksListGanttComponent implements OnInit {

  ui = UI;
  viewType = ViewType;
  approveStates = ApproveStates;
  userCardSize = CardSize;
  users: User[] = [];
  errors: BackendError[] = [];
  loading = false;
  pageSize = PAGE_SIZE;
  count: number;

  form = this.fb.group(
    {
      first: PAGE_SIZE,
      offset: [0],
      team: null
    });


  constructor(private teamBreaksGQL: AllTeamWorkBreaks,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(() => this.loadBreaks());
    this.route.data.subscribe(({team}) => this.form.get('team').setValue(team.id));
  }

  loadBreaks() {
    const filter = new TeamGanttFilter(this.form.getRawValue());
    this.loading = true;
    (environment.mocks
      ? of(getMock(UsersPaging, serialize(filter) as R)).pipe(delay(MOCKS_DELAY))
      : this.teamBreaksGQL.fetch(serialize(filter) as R).pipe(catchGQLErrors(),
        map(({data: {breaks}}) => deserialize(breaks, UsersPaging))))
      .pipe(finalize(() => this.loading = false))
      .subscribe(ganttBreaks => [this.users, this.count] = [ganttBreaks.results, ganttBreaks.count],
          err => this.errors = err);
  }
}
