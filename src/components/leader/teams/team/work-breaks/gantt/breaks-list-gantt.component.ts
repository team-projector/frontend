import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { ApproveStates } from 'src/models/enums/break';
import { ViewType } from 'src/models/enums/view-type';
import { Team } from 'src/models/team';
import { PagingUsers } from 'src/models/user';
import { getMock } from 'src/utils/mocks';
import { AllTeamWorkBreaks } from './breaks-gantt.graphql';


@Component({
  selector: 'app-team-breaks-list-gantt',
  templateUrl: './breaks-list-gantt.components.html',
  styleUrls: ['./breaks-list-gantt.components.scss']
})
export class TeamBreaksListGanttComponent implements OnInit {

  team: Team;
  ui = UI;
  viewType = ViewType;
  approveStates = ApproveStates;
  workbreaks = [];
  loading = false;


  constructor(private teamBreaksGQL: AllTeamWorkBreaks,
              private route: ActivatedRoute) {
    route.data.subscribe(({team}) => this.team = team);
  }

  ngOnInit() {
    this.loadBreaks();
  }

  loadBreaks() {
    this.loading = true;
    (environment.mocks
      ? of(getMock(PagingUsers, {team: this.team.id})).pipe(delay(MOCKS_DELAY))
      : this.teamBreaksGQL.fetch({team: this.team.id} as R).pipe(
        map(({data: {breaks}}) => deserialize(breaks, PagingUsers))))
      .pipe(finalize(() => this.loading = false))
      .subscribe(ganttBreaks => {
        this.workbreaks = ganttBreaks.results;
      });
  }
}
