import { Component, Inject, OnInit } from '@angular/core';
import { ITeamsService, teams_service } from 'src/services/teams/interface';
import { TeamCard, TeamMemberRole } from 'src/models/team';
import { MeManager } from 'src/managers/me.manager';
import { filter } from 'rxjs/operators';
import { UI } from 'junte-ui';

@Component({
  selector: 'app-leader-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  ui = UI;
  teams: TeamCard[] = [];

  constructor(@Inject(teams_service) private teamsService: ITeamsService,
              private me: MeManager) {
  }

  ngOnInit() {
    this.me.user$.pipe(filter(u => !!u))
      .subscribe(user => {
        this.teamsService.list(user.id, [TeamMemberRole.leader])
          .subscribe((paging) => this.teams = paging.results);
      });
  }

}
