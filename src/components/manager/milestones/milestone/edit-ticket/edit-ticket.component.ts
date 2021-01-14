import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { addWeeks, endOfWeek, startOfWeek } from 'date-fns';
import { Observable, of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from '@junte/serialize-ts';
import { DFNS_OPTIONS, MOCKS_DELAY, TODAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { IssueSort } from 'src/models/enums/issue';
import { TicketStates, TicketTypes } from 'src/models/enums/ticket';
import { Issue, IssuesFilter, PagingIssues } from 'src/models/issue';
import { Milestone, MilestonesFilter, PagingMilestones } from 'src/models/milestone';
import { Ticket, TicketUpdate } from 'src/models/ticket';
import { catchGQLErrors } from 'src/utils/gql-errors';
import { BackendError } from 'src/types/gql-errors';
import { getMock } from '@junte/mocker';
import { CreateTicketGQL, EditTicketGQL, FindIssuesGQL, FindMilestonesGQL, TicketGQL } from './edit-ticket.graphql';

const FOUND_ISSUES_COUNT = 10;
const FOUND_MILESTONES_COUNT = 10;

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent {

  ui = UI;
  milestoneTicketTypes = TicketTypes;
  milestoneTicketStates = TicketStates;

  private _ticket: Ticket;
  private _id: string;

  progress = {loading: false, saving: false};
  selected = {issues: []};

  milestones: Milestone[] = [];
  errors: BackendError[] = [];

  milestoneControl = this.fb.control(null);
  form = this.fb.group({
    id: [null],
    milestone: this.milestoneControl,
    type: [TicketTypes.feature, Validators.required],
    title: [null, Validators.required],
    estimate: [null],
    role: [null],
    startDate: [new Date(), Validators.required],
    dueDate: [new Date(), Validators.required],
    state: [TicketStates.created],
    url: [null],
    issues: [[]]
  });

  set milestone(milestone: string) {
    this.milestoneControl.setValue(milestone);
  }

  set id(id: string) {
    this._id = id;
    this.load();
  }

  get id() {
    return this._id;
  }

  set ticket(ticket: Ticket) {
    if (!!ticket) {
      this._ticket = ticket;

      this.form.patchValue({
        id: ticket.id,
        type: ticket.type,
        milestone: ticket.milestone.id,
        title: ticket.title,
        role: ticket.role,
        startDate: ticket.startDate,
        dueDate: ticket.dueDate,
        estimate: ticket.estimate,
        state: ticket.state,
        url: ticket.url,
        issues: ticket.issues.map(i => i.id)
      });
    }
  }

  get ticket() {
    return this._ticket;
  }

  @Output() saved = new EventEmitter<Ticket>();
  @Output() canceled = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              private getTicketGQL: TicketGQL,
              private createTicketGQL: CreateTicketGQL,
              private editTicketGQL: EditTicketGQL,
              private findMilestonesGQL: FindMilestonesGQL,
              private findIssuesGQL: FindIssuesGQL) {
  }

  private load() {
    this.progress.loading = true;
    const action = this.getTicketGQL.fetch({ticket: this.id} as R)
      .pipe(map(({data: {ticket}}) => deserialize(ticket, Ticket)));

    (environment.mocks ? of(getMock(Ticket)).pipe(delay(MOCKS_DELAY)) : action)
      .pipe(finalize(() => this.progress.loading = false))
      .subscribe(ticket => this.ticket = ticket,
        err => this.errors = err);
  }

  thisWeek() {
    this.form.patchValue({
      startDate: startOfWeek(TODAY, DFNS_OPTIONS),
      dueDate: endOfWeek(TODAY, DFNS_OPTIONS)
    });
  }

  nextWeek() {
    const next = addWeeks(TODAY, 1);
    this.form.patchValue({
      startDate: startOfWeek(next, DFNS_OPTIONS),
      dueDate: endOfWeek(next, DFNS_OPTIONS)
    });
  }

  save() {
    this.progress.saving = true;
    const mutation = !!this.ticket ? this.editTicketGQL : this.createTicketGQL;
    const action = mutation.mutate(serialize(new TicketUpdate(this.form.getRawValue())) as R);
    action.pipe(catchGQLErrors(), finalize(() => this.progress.saving = false),
      map(({data: {response: {ticket}}}) => deserialize(ticket, Ticket)))
      .subscribe(ticket => this.saved.emit(ticket),
        err => this.errors = err);
  }

  findMilestones() {
    return (query: string) => new Observable<Milestone[]>(o => {
      const filter = new MilestonesFilter({
        q: query,
        first: FOUND_MILESTONES_COUNT
      });
      (environment.mocks
          ? of(getMock(PagingMilestones)).pipe(delay(MOCKS_DELAY))
          : this.findMilestonesGQL.fetch(serialize(filter) as R).pipe(
            catchGQLErrors(),
            map(({data: {milestones}}) => deserialize(milestones, PagingMilestones)))
      ).subscribe(({results: milestones}) => {
        o.next(milestones);
        o.complete();
      }, err => this.errors = err);
    });
  }

  findIssues() {
    return (query: string) => new Observable<Issue[]>(o => {
      const filter = new IssuesFilter({
        q: query,
        sort: IssueSort.createdAtDesc,
        first: FOUND_ISSUES_COUNT
      });
      this.findIssuesGQL.fetch(serialize(filter) as R)
        .pipe(catchGQLErrors(),
          map(({data: {issues}}) => deserialize(issues, PagingIssues)))
        .subscribe(({results: issues}) => {
            o.next(issues);
            o.complete();
          },
          err => this.errors = err);
    });
  }
}
