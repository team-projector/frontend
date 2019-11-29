import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ComponentFactoryResolver, Injector, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { R } from 'apollo-angular/types';
import { ModalOptions, ModalService, UI } from 'junte-ui';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter as filtering, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { IssuesGQL } from 'src/components/issues/issues/issues.graphql';
import { MilestoneIssuesSummaryGQL } from 'src/components/manager/milestones/milestone/milestone.graphql';
import { EditTicketComponent } from 'src/components/manager/milestones/milestone/tickets/edit-ticket/edit-ticket.component';
import {
  AllTicketsGQL,
  AttachIssueGQL,
  DeleteTicketGQL
} from 'src/components/manager/milestones/milestone/tickets/milestone-tickets.graphql';
import { Issue, IssuesFilter, IssuesSummary, IssueState, PagingIssues } from 'src/models/issue';
import { StandardLabel } from 'src/models/label';
import { Milestone } from 'src/models/milestone';
import { PagingTickets, Ticket, TicketsFilter } from 'src/models/ticket';
import { DurationFormat } from 'src/pipes/date';
import { equals } from 'src/utils/equals';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent implements OnInit {

  private milestone$ = new BehaviorSubject<Milestone>(null);
  private orderBy$ = new BehaviorSubject<string>(null);
  private first$ = new BehaviorSubject<number>(null);
  private offset$ = new BehaviorSubject<number>(null);
  private _current: string;

  ui = UI;
  issuesState = IssueState;
  standardLabel = StandardLabel;
  loading = {tickets: false, issues: false};
  tickets: Ticket[] = [];
  issues: Issue[] = [];
  durationFormat = DurationFormat;
  summary: IssuesSummary;

  colors = {
    feature: UI.colors.green,
    improvement: UI.colors.blue,
    bug_fixing: UI.colors.red
  };

  @ViewChild('content', {static: false})
  content: TemplateRef<any>;

  @ViewChild('footer', {static: false})
  footer: TemplateRef<any>;

  @Input()
  set milestone(milestone: Milestone) {
    if (!equals(this.milestone, milestone)) {
      this.milestone$.next(milestone);
    }
  }

  get milestone() {
    return this.milestone$.getValue();
  }

  set orderBy(orderBy: string) {
    this.orderBy$.next(orderBy);
  }

  get orderBy() {
    return this.orderBy$.getValue();
  }

  set first(first: number) {
    this.first$.next(first);
  }

  get first() {
    return this.first$.getValue();
  }

  set offset(offset: number) {
    this.offset$.next(offset);
  }

  get offset() {
    return this.offset$.getValue();
  }

  set current(current: string) {
    this.issues = [];
    if (this._current !== current && !!current) {
      this._current = current;
      this.loadIssues();
    } else {
      this._current = null;
    }
  }

  get current() {
    return this._current;
  }

  constructor(private milestoneIssuesSummaryGQL: MilestoneIssuesSummaryGQL,
              private allTicketsGQL: AllTicketsGQL,
              private deleteTicketGQL: DeleteTicketGQL,
              private attachIssueGQL: AttachIssueGQL,
              private issuesGQL: IssuesGQL,
              private cfr: ComponentFactoryResolver,
              private injector: Injector,
              public modalService: ModalService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({milestone}) => this.milestone = milestone);

    combineLatest([this.milestone$, this.orderBy$, this.first$, this.offset$])
      .pipe(filtering(([milestone]) => !!milestone))
      .subscribe(() => this.load());
  }

  load() {
    this.loading.tickets = true;
    const filter = new TicketsFilter({
      milestone: this.milestone.id,
      orderBy: this.orderBy,
      first: this.first,
      offset: this.offset
    });

    this.allTicketsGQL.fetch(serialize(filter) as R).pipe(
      map(({data: {allTickets}}) => deserialize(allTickets, PagingTickets)),
      finalize(() => this.loading.tickets = false)
    ).subscribe(tickets => this.tickets = tickets.results);
  }

  loadIssues() {
    this.loading.issues = true;
    const filter = new IssuesFilter({
      milestone: this.milestone.id,
      ticket: this.current
    });

    this.issuesGQL.fetch(serialize(filter) as R)
      .pipe(map(({data: {issues}}) => deserialize(issues, PagingIssues).results), finalize(() => this.loading.issues = false))
      .subscribe(issues => this.issues = issues);
  }

  add() {
    this.open('Add ticket', 'add');
  }

  edit(ticket: Ticket) {
    this.open('Edit ticket', 'edit', ticket);
  }

  delete(id: string) {
    this.deleteTicketGQL.fetch({id})
      .subscribe(() => this.load());
  }

  open(title: string, icon: string, ticket: Ticket = null) {
    const component = this.cfr.resolveComponentFactory(EditTicketComponent).create(this.injector);
    component.instance.canceled.subscribe(() => this.modalService.close());
    component.instance.saved.subscribe(() => {
      this.modalService.close();
      this.load();
    });
    component.instance.milestone = this.milestone.id;
    component.instance.ticket = ticket;

    const options = new ModalOptions({
      title: {text: title, icon: icon},
      maxWidth: '400px'
    });

    this.modalService.open(component, options);
  }

  predicate(item: CdkDrag<number>) {
    return !!item.data['issue'];
  }

  predicateIssue(item: CdkDrag<number>) {
    return false;
  }

  drop(event: CdkDragDrop<string[]>) {
    const ticket = event.container.element.nativeElement.attributes.getNamedItem('ticket').value;
    this.attachIssueGQL.fetch({
      id: event.item.data['issue'],
      ticket: ticket
    }).subscribe(() => {
      this.load();
      this.current = ticket;
    });
  }

}
