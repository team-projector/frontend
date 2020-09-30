import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@junte/ui';
import { format } from 'date-fns';
import { METRIC_TYPE } from 'src/components/shared/metrics-type/consts';
import { DATE_FORMAT } from 'src/consts';
import { field, model } from 'src/decorators/model';
import { DurationFormat } from 'src/models/enums/duration-format';
import { MetricType } from 'src/models/enums/metrics';
import { MilestoneProblem } from 'src/models/enums/milestone';
import { DateSerializer } from 'src/serializers/date';
import { Team } from '../../../../../models/team';

@model()
export class TeamState {

  @field()
  user?: string;

  @field()
  project?: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  dueDate?: Date;

  constructor(defs: TeamState = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@Component({
  selector: 'app-leader-team-issues',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.scss']
})
export class TeamDashboardComponent {

  ui = UI;
  durationFormat = DurationFormat;
  milestoneProblem = MilestoneProblem;

  team: Team;

  filter = new FormControl();
  projectControl = new FormControl();
  metric = new FormControl(localStorage.getItem(METRIC_TYPE) || MetricType.all);
  form: FormGroup = this.formBuilder.group({
    filter: this.filter,
    project: this.projectControl,
    metric: this.metric
  });

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.data.subscribe(({team}) => this.team = team);
  }

  issuesByDeveloper({user, dueDate}) {
    const params = {user};
    if (!!dueDate) {
      Object.assign(params, {dueDate: format(dueDate, DATE_FORMAT)});
    }
    this.router.navigate(['issues', params],
      {relativeTo: this.route}).then(() => null);
  }

  issuesByProject(project: string) {
    this.router.navigate(['issues', {project}],
      {relativeTo: this.route}).then(() => null);
  }
}
