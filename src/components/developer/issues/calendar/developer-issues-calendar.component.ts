import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {R} from 'apollo-angular/types';
import {of} from 'rxjs';
import {delay, finalize, map} from 'rxjs/operators';
import {Period, UI} from '@esanum/ui';
import {getMock} from '@junte/mocker';
import {deserialize, serialize} from '@junte/serialize-ts';
import {LocalUI} from 'src/enums/local-ui';
import {environment} from 'src/environments/environment';
import {Me, UserProgressMetrics} from 'src/models/user';
import {DATE_FORMAT, MOCKS_DELAY, UI_DELAY} from 'src/consts';
import {DeveloperIssuesCalendarGQL} from './developer-issues-calendar.graphql';
import {IssuesCalendarDay, IssuesCalendarFilter} from 'src/models/issues-calendar';
import {Issue} from 'src/models/issue';
import {NGXLogger} from 'ngx-logger';
import {DurationFormat} from 'src/models/enums/duration-format';
import {IssueState} from 'src/models/enums/issue';
import {StandardLabel} from 'src/models/enums/standard-label';

interface DayInfo {
  metrics: UserProgressMetrics;
  issues: Issue[];
}

@Component({
  selector: 'app-developer-issues-calendar',
  templateUrl: './developer-issues-calendar.component.html',
  styleUrls: ['./developer-issues-calendar.component.scss']
})
export class DeveloperIssuesCalendarComponent {

  ui = UI;
  localUi = LocalUI;
  issueState = IssueState;
  dateFormat = DATE_FORMAT;
  durationFormat = DurationFormat;
  standardLabel = StandardLabel;
  progress = {loading: true};
  days = new Map<string, DayInfo>();

  me: Me;
  period: Period;

  constructor(
    private route: ActivatedRoute,
    private calendarGQL: DeveloperIssuesCalendarGQL,
    private logger: NGXLogger
  ) {
    this.route.data.subscribe(({me}) => this.me = me);
  }

  loadDays() {
    this.logger.debug('load issues calendar', this.period);
    const filter = new IssuesCalendarFilter({
      user: this.me.id,
      start: this.period.start,
      end: this.period.end
    });

    this.progress.loading = true;
    const action = environment.mocks
      ? of(Array.apply(null, Array(60))
        .map(() => getMock(IssuesCalendarDay, filter)))
        .pipe(delay(MOCKS_DELAY))
      : this.calendarGQL.fetch(serialize(filter) as R)
        .pipe(map(({data: {days}}) => days.map(item => deserialize(item, IssuesCalendarDay))));

    action.pipe(delay(UI_DELAY), finalize(() => this.progress.loading = false))
      .subscribe(days => days.forEach(d => this.days.set(d.getKey(), {metrics: d.metrics, issues: d.issues})));
  }
}
