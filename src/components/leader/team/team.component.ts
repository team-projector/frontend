import { Component, Inject, OnInit } from '@angular/core';
import { ITeamsService, teams_service } from '../../../services/teams/interface';
import { PagingTeamMembers } from '../../../models/team';
import { UI } from 'junte-ui';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leader-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  ui = UI;
  members: PagingTeamMembers;

  constructor(@Inject(teams_service) private teamsService: ITeamsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({members}) => this.members = members);
  }

}
