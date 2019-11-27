import { EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DEFAULT_FIRST, DEFAULT_OFFSET, isEqual } from 'junte-ui';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, pairwise, switchMap } from 'rxjs/operators';
import { IssuesState, ViewType } from 'src/components/issues/issues/issues.component';
import { IssuesType } from 'src/models/issue';

export class IssuesListComponent {

  viewType = ViewType;
  user: string;
  private state$ = new BehaviorSubject<IssuesState>(null);
  @Output() reloaded = new EventEmitter();

  set state(state: IssuesState) {
    this.state$.next(state);
  }

  get state() {
    return this.state$.getValue();
  }

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.pipe(switchMap(({user}) => {
        this.user = user ? user.id : null;
        return this.route.params;
      })
    ).subscribe(({q, sort, first, offset, type, team, user, project, due_date, milestone, ticket}) => {
      this.state = new IssuesState({
        q: q || null, sort: sort || null, first: +first || DEFAULT_FIRST, offset: +offset || DEFAULT_OFFSET,
        type: type || IssuesType.opened, user: user || this.user, due_date: due_date || null,
        team: team || null, project: project || null, milestone: milestone || null, ticket: ticket || null
      });
    });

    this.state$.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)), pairwise()).subscribe(([previous, current]) =>
      this.router.navigate([this.filter(previous, current)], {relativeTo: this.route}).then(() => null));
  }

  clearOffset(previous: IssuesState, current: IssuesState) {
    if (!!previous && (previous.first != current.first
      || previous.sort != current.sort
      || previous.q != current.q
      || previous.type != current.type
      || previous.team != current.team
      || previous.user != current.user
      || previous.project != current.project
      || previous.milestone != current.milestone
      || previous.ticket != current.ticket
      || previous.due_date != current.due_date)) {
      return DEFAULT_OFFSET;
    }
    return current.offset;
  }

  filter(previous: IssuesState, current: IssuesState): IssuesState {
    const state = new IssuesState();
    const offset = this.clearOffset(previous, current);

    if (!!current.first && current.first !== DEFAULT_FIRST) {
      state.first = current.first;
    }
    if (!!offset && offset !== DEFAULT_OFFSET) {
      state.offset = offset;
    }
    if (!!current.q) {
      state.q = current.q;
    }
    if (!!current.type && current.type !== IssuesType.opened) {
      state.type = current.type;
    }
    return state;
  }
}
