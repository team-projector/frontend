import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { getMock } from '@junte/mocker';
import { deserialize, serialize } from '@junte/serialize-ts';
import { UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { addDays, addWeeks, endOfWeek } from 'date-fns';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { delay, filter as filtering, finalize, map, tap } from 'rxjs/operators';
import { DFNS_OPTIONS, MOCKS_DELAY, TODAY, UI_DELAY } from '../../../consts';
import { LocalUI } from '../../../enums/local-ui';
import { environment } from '../../../environments/environment';
import { StandardLabel } from '../../../models/enums/standard-label';
import { TeamMemberRole } from '../../../models/enums/team';
import { Issue, IssueUpdate } from '../../../models/issue';
import { Milestone, MilestonesFilter, PagingMilestones } from '../../../models/milestone';
import { Project, ProjectsFilter, ProjectsPaging } from '../../../models/project';
import { TeamMember } from '../../../models/team';
import { BackendError } from '../../../types/gql-errors';
import { catchGQLErrors } from '../../../utils/gql-errors';
import { CardSize } from '../../shared/users/card/user-card.types';
import { CreateIssueGQL, ProjectMilestonesGQL, ProjectsGQL, ProjectTeamMembersGQL } from './create-issue.graphql';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})

export class CreateIssueComponent implements OnInit {

  ui = UI;
  localUi = LocalUI;
  userCardSize = CardSize;
  standardLabel = StandardLabel;
  teamMemberRole = TeamMemberRole;

  progress = {
    projects: false,
    milestones: false,
    developers: false,
    creating: false
  };
  errors: BackendError[] = [];

  projects: Project[] = [];
  milestones: Milestone[] = [];
  developers: TeamMember[] = [];
  issue: Issue;

  projectControl = this.fb.control(null, [Validators.required]);
  milestoneControl = this.fb.control({value: null, disabled: true});
  developerControl = this.fb.control({value: null, disabled: true}, [Validators.required]);
  estimateControl = this.fb.control(null);
  dueDateControl = this.fb.control(null, [Validators.required]);

  form = this.fb.group({
    project: this.projectControl,
    milestone: this.milestoneControl,
    title: this.fb.control(null, [Validators.required]),
    user: this.developerControl,
    labels: this.fb.control([StandardLabel.toDo]),
    estimate: this.estimateControl,
    dueDate: this.dueDateControl
  });

  @ViewChild('content', {read: ElementRef})
  backdrop: ElementRef<HTMLElement>;

  constructor(private projectsGQL: ProjectsGQL,
              private projectMilestonesGQL: ProjectMilestonesGQL,
              private projectTeamMembersGQL: ProjectTeamMembersGQL,
              private createIssueGQL: CreateIssueGQL,
              private fb: FormBuilder,
              private logger: NGXLogger) {
  }

  ngOnInit() {
    this.projectControl.valueChanges
      .pipe(tap(p => {
        if (!!p) {
          this.milestoneControl.enable();
          this.developerControl.enable();
        } else {
          this.milestoneControl.disable();
          this.developerControl.disable();
        }
      }), filtering(p => !!p))
      .subscribe(() => {
        this.form.patchValue({milestone: null, user: null});
        this.loadMilestones();
        this.loadDevelopers();
      });

    this.loadProjects();
  }

  private loadProjects() {
    const filter = new ProjectsFilter();
    this.logger.debug('load projects');
    this.progress.projects = true;
    return (environment.mocks
      ? of(getMock(ProjectsPaging)).pipe(delay(MOCKS_DELAY))
      : this.projectsGQL.fetch(serialize(filter) as R)
        .pipe(catchGQLErrors(), map(({data: {projects}}) =>
          deserialize(projects, ProjectsPaging))))
      .pipe(delay(UI_DELAY), finalize(() => this.progress.projects = false))
      .subscribe(projects => this.projects = projects.results,
        err => this.errors = err);
  }

  private loadMilestones() {
    const {project} = this.form.getRawValue();
    const filter = new MilestonesFilter({project});
    this.logger.debug('load milestones');
    this.progress.milestones = true;
    return (environment.mocks
      ? of(getMock(PagingMilestones)).pipe(delay(MOCKS_DELAY))
      : this.projectMilestonesGQL.fetch(serialize(filter) as R)
        .pipe(catchGQLErrors(), map(({data: {milestones}}) =>
          deserialize(milestones, PagingMilestones))))
      .pipe(delay(UI_DELAY), finalize(() => this.progress.milestones = false))
      .subscribe(milestones => {
          this.milestones = milestones.results;
          if (this.milestones.length > 0) {
            this.milestoneControl.setValue(this.milestones[0].id);
          }
        },
        err => this.errors = err);
  }

  private loadDevelopers() {
    const {project: id} = this.form.getRawValue();
    this.logger.debug('load developers');
    this.progress.developers = true;
    return (environment.mocks
      ? of(getMock(Project)).pipe(delay(MOCKS_DELAY))
      : this.projectTeamMembersGQL.fetch({id: id} as R)
        .pipe(catchGQLErrors(), map(({data: {project}}) =>
          deserialize(project, Project))))
      .pipe(delay(UI_DELAY), finalize(() => this.progress.developers = false))
      .subscribe(project => this.developers = project.team?.members || [],
        err => this.errors = err);
  }

  tomorrow() {
    this.dueDateControl.setValue(addDays(TODAY, 1));
  }

  thisWeek() {
    this.dueDateControl.setValue(endOfWeek(TODAY, DFNS_OPTIONS));
  }

  nextWeek() {
    const next = addWeeks(TODAY, 1);
    this.dueDateControl.setValue(endOfWeek(next, DFNS_OPTIONS));
  }

  createIssue() {
    const request = new IssueUpdate(this.form.getRawValue());
    this.logger.debug('creating issue');
    this.progress.creating = true;
    return (environment.mocks
      ? of(getMock(Issue)).pipe(delay(MOCKS_DELAY))
      : this.createIssueGQL.fetch(serialize(request) as R)
        .pipe(catchGQLErrors(), map(({data: {response: {issue}}}) =>
          deserialize(issue, Issue))))
      .pipe(finalize(() => this.progress.creating = false))
      .subscribe(issue => {
          this.issue = issue;
          this.form.patchValue({
            title: null,
            estimate: null,
            dueDate: null
          });
        },
        err => this.errors = err);
  }

}
