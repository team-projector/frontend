import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { TableComponent, UI } from 'junte-ui';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter as filtering } from 'rxjs/operators';
import { ITeamsService, teams_service } from 'src/services/teams/interface';
import { TeamIssueFilter } from 'src/models/problem';
import { TimeExpensesFilter } from 'src/models/spent-time';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'src/consts';
import { IssueState } from 'src/models/issue';

@Component({
  selector: 'app-leader-issues-list',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})

export class TeamIssuesComponent implements OnInit {

  ui = UI;
  issuesState = IssueState;

  private team$ = new BehaviorSubject<number>(null);
  private user$ = new BehaviorSubject<number>(null);

  filter: TeamIssueFilter = new TeamIssueFilter({page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE});

  @Input()
  set team(team: number) {
    this.team$.next(team);
  }

  @Input()
  set user(user: number) {
    this.user$.next(user);
  }

  @ViewChild('table')
  table: TableComponent;

  constructor(@Inject(teams_service) private teamsService: ITeamsService) {
  }

  ngOnInit() {
    combineLatest(this.team$, this.user$)
      .pipe(filtering(t => !!t))
      .subscribe(([team, user]) => {
        if (!!user) {
          this.filter.user = user;
        }

        this.table.fetcher = (filter: TeamIssueFilter) => this.teamsService.issues(team, Object.assign(this.filter, filter));
        this.table.load();
      });
  }
}
