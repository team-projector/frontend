import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from '@junte/serialize-ts';
import { MOCKS_DELAY } from 'src/consts';
import { catchGQLErrors } from 'src/utils/gql-errors';
import { field, model } from 'src/decorators/model';
import { environment } from 'src/environments/environment';
import { ApproveStates } from 'src/models/enums/break';
import { ViewType } from 'src/models/enums/view-type';
import { BackendError } from 'src/types/gql-errors';
import { User, UsersPaging } from 'src/models/user';
import { getMock } from '@junte/mocker';
import { Team, TeamMember } from '../../../../../../models/team';
import { CardSize } from '../../../../../shared/users/card/user-card.types';
import { TeamBreaksGQL } from './breaks-gantt.graphql';

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


  errors: BackendError[] = [];
  progress = {loading: false};

  team: Team;
  member: TeamMember[] = [];

  constructor(private teamBreaksGQL: TeamBreaksGQL,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({team}) => {
      this.team = team;
      this.loadBreaks();
    });
  }

  loadBreaks() {
    this.progress.loading = true;
    (environment.mocks
      ? of(getMock(Team, {id: this.team.id})).pipe(delay(MOCKS_DELAY))
      : this.teamBreaksGQL.fetch({id: this.team.id} as R).pipe(catchGQLErrors(),
        map(({data: {team}}) => deserialize(team, Team))))
      .pipe(finalize(() => this.progress.loading = false))
      .subscribe(team => this.member = team.members,
        err => this.errors = err);
  }
}
