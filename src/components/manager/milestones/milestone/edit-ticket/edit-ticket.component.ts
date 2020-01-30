import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { UI } from 'junte-ui';
import { Observable, of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { IssuesGQL } from 'src/components/issues/issues/issues.graphql';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { TicketTypes } from 'src/models/enums/ticket';
import { GqlError } from 'src/models/gql-errors';
import { IssuesFilter, PagingIssues } from 'src/models/issue';
import { Issue, Ticket, TicketUpdate } from 'src/models/ticket';
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { getMock } from 'src/utils/mocks';
import { CreateTicketGQL, EditTicketGQL, GetTicketGQL } from './edit-ticket.graphql';

const FOUND_ISSUES_COUNT = 10;

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent {

  ui = UI;
  milestoneTicketTypes = TicketTypes;

  private _ticket: Ticket;
  private _id: string;

  errors: GqlError[] = [];
  progress = {loading: false, saving: false};

  milestoneControl = this.fb.control(null);

  form = this.fb.group({
    id: [null],
    milestone: this.milestoneControl,
    type: [TicketTypes.feature, Validators.required],
    title: [null, Validators.required],
    role: [null],
    startDate: [new Date(), Validators.required],
    dueDate: [new Date(), Validators.required],
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
        title: ticket.title,
        role: ticket.role,
        startDate: ticket.startDate,
        dueDate: ticket.dueDate,
        url: ticket.url,
        issues: ticket.issues.map(i => i.id)
      });
    }
  }

  get ticket() {
    return this._ticket;
  }

  @Output() saved = new EventEmitter<TicketUpdate>();
  @Output() canceled = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              private getTicketGQL: GetTicketGQL,
              private createTicketGQL: CreateTicketGQL,
              private editTicketGQL: EditTicketGQL,
              private issuesGQL: IssuesGQL) {
  }

  private load() {
    this.progress.loading = true;
    const action = this.getTicketGQL.fetch({ticket: this.id} as R)
      .pipe(map(({data: {ticket}}) => deserialize(ticket, Ticket)));

    (environment.mocks ? of(getMock(Ticket)).pipe(delay(MOCKS_DELAY)) : action)
      .pipe(finalize(() => this.progress.loading = false))
      .subscribe(ticket => this.ticket = ticket);
  }

  save() {
    this.progress.saving = true;
    const mutation = !!this.ticket ? this.editTicketGQL : this.createTicketGQL;
    const action = mutation.mutate(serialize(new TicketUpdate(this.form.getRawValue())) as R);
    action.pipe(catchGQLErrors(), finalize(() => this.progress.saving = false))
      .subscribe(() => this.saved.emit(),
        (err: GqlError[]) => this.errors = err);
  }

  findIssues() {
    return (query: string) => new Observable<Issue[]>(o => {
      const filter = new IssuesFilter({
        q: query,
        orderBy: '-createdAt',
        first: FOUND_ISSUES_COUNT
      });
      this.issuesGQL.fetch(serialize(filter) as R)
        .pipe(catchGQLErrors(),
          map(({data: {issues}}) => deserialize(issues, PagingIssues)))
        .subscribe(({results: issues}) => {
            o.next(issues);
            o.complete();
          },
          (err: GqlError[]) => this.errors = err);
    });
  }
}
