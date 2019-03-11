import {Component, Inject, OnInit} from '@angular/core';
import {ITeamsService, teams_service} from '../../../services/teams/interface';
import {TeamCard, TeamMemberRole} from '../../../models/team';
import {MeManager} from '../../../managers/me.manager';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-leader-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

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
