import { Clipboard } from '@angular/cdk/clipboard';
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ComponentFactoryResolver, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalOptions, ModalService, PopoverInstance, UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { NGXLogger } from 'ngx-logger';
import { combineLatest, of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { IssueState } from 'src/models/enums/issue';
import { TicketProblem, TicketStates, TicketsTypes, TicketTypes } from 'src/models/enums/ticket';
import { Issue, IssuesFilter, PagingIssues } from 'src/models/issue';
import { PagingTickets, Ticket, TicketsFilter, TicketsSummary } from 'src/models/ticket';
import { BackendError } from 'src/types/gql-errors';
import { getMock } from 'src/utils/mocks';
import { LocalUI } from 'src/enums/local-ui';
import { Milestone } from 'src/models/milestone';
import { equals } from 'src/utils/equals';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { MilestoneTicketsGQL, AttachIssueGQL, DeleteTicketGQL, MilestoneIssuesSummaryGQL, TicketIssuesGQL, TicketsSummaryGQL } from './milestone.graphql';
import { MilestoneState, MilestoneUpdateState } from './milestone.types';

enum LoadMode {
  changes,
  force
}

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent implements OnInit {

  ui = UI;
  localUi = LocalUI;
  durationFormat = DurationFormat;
  ticketTypes = TicketTypes;
  ticketProblem = TicketProblem;
  issueStates = IssueState;
  ticketStates = TicketStates;
  ticketsTypes = TicketsTypes;
  loadMode = LoadMode;

  progress = {
    tickets: false,
    summary: false,
    issues: false,
    deleting: {}
  };
  errors: BackendError[] = [];
  state = {
    copied: false
  };

  milestone: Milestone;
  filters: {
    tickets: TicketsFilter,
    issues: IssuesFilter
  } = {tickets: null, issues: null};
  tickets: Ticket[] = [];
  summary: TicketsSummary;
  issues: Issue[] = [];
  instance: { popover: PopoverInstance } = {popover: null};

  typeControl = this.fb.control(TicketsTypes.all);
  ticketControl = this.fb.control(null);
  form = this.fb.group({
    type: this.typeControl,
    ticket: this.ticketControl
  });

  constructor(private milestoneIssuesSummaryGQL: MilestoneIssuesSummaryGQL,
              private milestoneTicketsGQL: MilestoneTicketsGQL,
              private ticketsSummaryGQL: TicketsSummaryGQL,
              private deleteTicketGQL: DeleteTicketGQL,
              private attachIssueGQL: AttachIssueGQL,
              private ticketIssuesGQL: TicketIssuesGQL,
              private cfr: ComponentFactoryResolver,
              private injector: Injector,
              private modal: ModalService,
              private fb: FormBuilder,
              private clipboard: Clipboard,
              private route: ActivatedRoute,
              private router: Router,
              private logger: NGXLogger) {
  }

  ngOnInit() {
    combineLatest([this.route.data, this.route.params])
      .subscribe(([{milestone, ticket}, {type}]) => {
        this.milestone = milestone;
        const state = new MilestoneState({
          type: type || TicketsTypes.all,
          ticket: ticket?.id || null
        });
        this.logger.debug('state was changed', state);
        this.form.patchValue(state, {emitEvent: false});

        this.load();
        this.loadIssues();
      });

    this.form.valueChanges
      .subscribe(({ticket, type}) => {
        const state = new MilestoneUpdateState({
          ticket: ticket || undefined,
          type: type !== TicketsTypes.all ? type : undefined
        });
        this.logger.debug('updating state', state);
        this.router.navigate([serialize(state)],
          {relativeTo: this.route, fragment: ticket})
          .then(() => null);
      });

    // TODO: think about it
    // this.load();
  }

  private load(mode = LoadMode.changes) {
    const filter = new TicketsFilter(
      {
        milestone: this.milestone.id,
        state: (() => {
          switch (this.typeControl.value) {
            case TicketsTypes.created:
              return TicketStates.created;
            case TicketsTypes.planning:
              return TicketStates.planning;
            case TicketsTypes.accepting:
              return TicketStates.accepting;
            case TicketsTypes.doing:
              return TicketStates.doing;
            case TicketsTypes.testing:
              return TicketStates.testing;
            case TicketsTypes.done:
              return TicketStates.done;
            default:
              return undefined;
          }
        })()
      });
    if (equals(filter, this.filters.tickets) && mode === LoadMode.changes) {
      this.logger.debug('filter was not changed');
      return;
    }
    this.filters.tickets = filter;
    this.loadTickets();
    this.loadSummary();
  }

  loadTickets() {
    this.logger.debug('load tickets');
    this.progress.tickets = true;
    const action = environment.mocks
      ? of(getMock(PagingTickets, this.filters.tickets)).pipe(delay(MOCKS_DELAY))
      : this.milestoneTicketsGQL.fetch(serialize(this.filters.tickets) as R)
        .pipe(map(({data: {tickets}}) => deserialize(tickets, PagingTickets)));
    action.pipe(finalize(() => this.progress.tickets = false))
      .subscribe(tickets => this.tickets = tickets.results,
        err => this.errors = err);
  }

  loadSummary() {
    this.logger.debug('load summary');
    this.progress.summary = true;
    return (environment.mocks
      ? of(getMock(TicketsSummary)).pipe(delay(MOCKS_DELAY))
      : this.ticketsSummaryGQL.fetch(serialize(this.filters.tickets) as R)
        .pipe(map(({data: {summary}}) => deserialize(summary, TicketsSummary))))
      .pipe(finalize(() => this.progress.summary = false))
      .subscribe(summary => this.summary = summary,
        err => this.errors = err);
  }

  private loadIssues(mode = LoadMode.changes) {
    this.logger.debug('load issues');
    const {ticket} = this.form.getRawValue();
    const filter = new IssuesFilter({ticket});
    if (equals(filter, this.filters.issues) && mode === LoadMode.changes) {
      this.logger.debug('filter was not changed');
      return;
    }
    this.filters.issues = filter;
    if (!!ticket) {
      this.progress.issues = true;
      (environment.mocks
        ? of(getMock(PagingIssues)).pipe(delay(MOCKS_DELAY))
        : this.ticketIssuesGQL.fetch(serialize(this.filters.issues) as R)
          .pipe(map(({data: {ticket: {issues}}}) => deserialize(issues, PagingIssues))))
        .pipe(delay(UI_DELAY), finalize(() => this.progress.issues = false))
        .subscribe(issues => this.issues = issues.results,
          err => this.errors = err);
    }
  }

  add() {
    this.edit();
  }

  edit(ticket: Ticket = null) {
    this.instance.popover?.hide();
    const component = this.cfr.resolveComponentFactory(EditTicketComponent)
      .create(this.injector);
    component.instance.milestone = this.milestone.id;
    if (!!ticket) {
      component.instance.id = ticket.id;
    }
    component.instance.canceled.subscribe(() => this.modal.close());
    component.instance.saved.subscribe(() => {
      this.modal.close();
      this.load(LoadMode.force);
      this.loadIssues(LoadMode.force);
      if (!!ticket && ticket.id !== this.ticketControl.value) {
        this.ticketControl.patchValue(ticket.id);
      }
    });

    const options = new ModalOptions({
      title: !!ticket
        ? {text: $localize`:@@action.edit:Edit`, icon: UI.icons.edit}
        : {text: $localize`:@@action.add:Add`, icon: UI.icons.add},
      maxWidth: '400px'
    });
    this.modal.open(component, options);
  }

  delete(id: string) {
    this.instance.popover?.hide();
    this.progress.deleting[id] = true;
    this.deleteTicketGQL.mutate({id})
      .pipe(delay(UI_DELAY), finalize(() => this.progress.deleting[id] = false))
      .subscribe(() => this.load(LoadMode.force), err => this.errors = err);
  }

  toggleIssues(ticket: string) {
    this.issues = [];
    this.ticketControl.setValue(this.ticketControl.value === ticket
      ? null : ticket);
  }

  getLink(ticket: string) {
    this.state.copied = true;
    this.clipboard.copy(`${document.location.origin}/tickets/${ticket}`);
    setTimeout(() => {
      this.state.copied = false;
      if (this.instance.popover) {
        this.instance.popover.hide();
        this.instance.popover = null;
      }
    }, 2000);
  }

  predicate(item: CdkDrag<number>) {
    return !!item.data['issue'];
  }

  predicateIssue(_item: CdkDrag<number>) {
    return false;
  }

  drop(event: CdkDragDrop<string[]>, ticket) {
    const issue = event.item.data['issue'];
    this.attachIssueGQL.mutate({issue: issue, ticket: ticket})
      .subscribe(() => {
          this.load(LoadMode.force);
          this.ticketControl.patchValue(ticket);
        },
        err => this.errors = err);
  }

}
