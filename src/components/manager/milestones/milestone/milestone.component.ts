import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ComponentFactoryResolver, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isEqual, ModalOptions, ModalService, PopoverComponent, UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { combineLatest, of } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY, PLATFORM_DELAY } from 'src/consts';
import { field, model } from 'src/decorators/model';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { IssueState } from 'src/models/enums/issue';
import { TicketProblem, TicketStates, TicketsTypes, TicketTypes } from 'src/models/enums/ticket';
import { Issue, IssuesFilter, PagingIssues } from 'src/models/issue';
import { PagingTickets, Ticket, TicketsFilter, TicketsSummary } from 'src/models/ticket';
import { getMock } from 'src/utils/mocks';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import {
  AllTicketsGQL,
  AttachIssueGQL,
  DeleteTicketGQL,
  MilestoneIssuesSummaryGQL,
  TicketIssuesGQL,
  TicketsSummaryGQL
} from './milestone.graphql';

@model()
class MilestoneState {

  @field()
  ticket?: string;

  @field()
  type?: TicketsTypes;

  constructor(defs: MilestoneState = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;
  ticketTypes = TicketTypes;
  ticketProblem = TicketProblem;
  issueStates = IssueState;
  ticketStates = TicketStates;
  ticketsTypes = TicketsTypes;
  popover: PopoverComponent;

  milestoneControl = new FormControl(null);
  ticketControl = new FormControl(null);
  typeControl = new FormControl(TicketsTypes.all);

  form = this.fb.group({
    milestone: this.milestoneControl,
    type: this.typeControl
  });

  loading = {tickets: false, summary: false, issues: false};
  tickets: Ticket[] = [];
  summary: TicketsSummary;
  issues: Issue[] = [];

  constructor(private milestoneIssuesSummaryGQL: MilestoneIssuesSummaryGQL,
              private allTicketsGQL: AllTicketsGQL,
              private ticketsSummaryGQL: TicketsSummaryGQL,
              private deleteTicketGQL: DeleteTicketGQL,
              private attachIssueGQL: AttachIssueGQL,
              private ticketIssuesGQL: TicketIssuesGQL,
              private cfr: ComponentFactoryResolver,
              private injector: Injector,
              private modal: ModalService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.ticketControl.valueChanges
      .pipe(distinctUntilChanged((a, b) => isEqual(a, b)))
      .subscribe(ticket => {
        const state = new MilestoneState({
          ticket: ticket || undefined,
          type: this.typeControl.value
        });
        this.router.navigate([serialize(state)], {relativeTo: this.route}).then(() => null);
        this.loadIssues();
      });

    this.typeControl.valueChanges
      .pipe(distinctUntilChanged((a, b) => isEqual(a, b)))
      .subscribe(type => {
        const state = new MilestoneState({type: type !== TicketsTypes.all ? type : undefined});
        this.ticketControl.setValue(null);
        this.router.navigate([serialize(state)], {relativeTo: this.route}).then(() => null);
        this.load();
      });

    combineLatest([this.route.data, this.route.params])
      .pipe(debounceTime(PLATFORM_DELAY), distinctUntilChanged((a, b) => isEqual(a, b)))
      .subscribe(([{milestone, ticket}, {type}]) => {
        this.milestoneControl.patchValue(!!milestone ? milestone.id : null);
        this.typeControl.patchValue(type || TicketsTypes.all);
        this.ticketControl.patchValue(!!ticket ? ticket.id : null);
      });
  }

  getState() {
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
  }

  loadTickets() {
    this.loading.tickets = true;
    const filter = new TicketsFilter({milestone: this.milestoneControl.value, state: this.getState()});
    (environment.mocks
      ? of(getMock(PagingTickets, filter)).pipe(delay(MOCKS_DELAY))
      : this.allTicketsGQL.fetch(serialize(filter) as R).pipe(
        map(({data: {allTickets}}) => deserialize(allTickets, PagingTickets))))
      .pipe(finalize(() => this.loading.tickets = false))
      .subscribe(tickets => this.tickets = tickets.results);
  }

  loadSummary() {
    this.loading.summary = true;
    const filter = new TicketsFilter({milestone: this.milestoneControl.value, state: this.getState()});
    return (environment.mocks
      ? of(getMock(TicketsSummary)).pipe(delay(MOCKS_DELAY))
      : this.ticketsSummaryGQL.fetch(serialize(filter) as R)
        .pipe(map(({data: {summary}}) => deserialize(summary, TicketsSummary))))
      .pipe(finalize(() => this.loading.summary = false))
      .subscribe(summary => this.summary = summary);
  }

  private load() {
    this.loadSummary();
    this.loadTickets();
  }

  private loadIssues() {
    if (!!this.ticketControl.value) {
      this.loading.issues = true;
      const filter = new IssuesFilter({ticket: this.ticketControl.value});
      (environment.mocks
        ? of(getMock(PagingIssues).results).pipe(delay(MOCKS_DELAY))
        : this.ticketIssuesGQL.fetch(serialize(filter) as R)
          .pipe(map(({data: {ticket: {issues}}}) => deserialize(issues, PagingIssues).results)))
        .pipe(finalize(() => this.loading.issues = false))
        .subscribe(issues => this.issues = issues);
    }
  }

  add() {
    this.edit();
  }

  edit(ticket: Ticket = null) {
    const component = this.cfr.resolveComponentFactory(EditTicketComponent).create(this.injector);
    component.instance.milestone = this.milestoneControl.value;
    component.instance.canceled.subscribe(() => this.modal.close());
    component.instance.saved.subscribe(() => {
      this.modal.close();
      this.loadTickets();
      if (!!ticket && ticket.id !== this.ticketControl.value) {
        this.ticketControl.patchValue(ticket.id);
      }
    });
    if (!!ticket) {
      component.instance.id = ticket.id;
    }

    const options = new ModalOptions({
      title: !!ticket
        ? {text: $localize`:@@action.edit:Edit`, icon: UI.icons.edit}
        : {text: $localize`:@@action.add:Add`, icon: UI.icons.add},
      maxWidth: '400px'
    });

    this.modal.open(component, options);
  }

  delete(id: string) {
    this.deleteTicketGQL.mutate({id})
      .subscribe(() => this.loadTickets());
  }

  toggleIssues(ticket: string) {
    this.issues = [];
    this.ticketControl.setValue(this.ticketControl.value === ticket ? null : ticket);
  }

  predicate(item: CdkDrag<number>) {
    return !!item.data['issue'];
  }

  predicateIssue(item: CdkDrag<number>) {
    return false;
  }

  drop(event: CdkDragDrop<string[]>, ticket) {
    const issue = event.item.data['issue'];
    this.attachIssueGQL.mutate({
      issue: issue,
      ticket: ticket
    }).subscribe(() => {
      this.loadTickets();
      this.ticketControl.patchValue(ticket);
    });
  }

}
