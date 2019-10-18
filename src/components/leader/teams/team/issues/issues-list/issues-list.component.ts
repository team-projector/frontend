import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from 'junte-ui';
import { IssuesType } from 'src/models/issue';
import { Project } from 'src/models/project';
import { Team } from 'src/models/team';
import { User } from 'src/models/user';

@Component({
  selector: 'app-team-list-issues-component',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})

export class TeamIssuesListComponent implements OnInit {

  ui = UI;

  team: Team;
  user: User;
  project: Project;
  dueDate: Date;
  type: IssuesType;

  @Output() reloaded = new EventEmitter();

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({team, user, project, dueDate, type}) =>
      [this.team, this.user, this.project, this.dueDate, this.type] =
        [team, user, project, dueDate, type]);
  }

  filtered(state: { type?, due_date?, project? }) {
    this.router.navigate([state],
      {relativeTo: this.route});
  }
}
