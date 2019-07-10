import {Component, Inject, OnInit} from '@angular/core';
import {ITeamsService, teams_service} from 'src/services/teams/interface';
import {Team, TeamMemberRole} from 'src/models/team';
import {MeManager} from 'src/managers/me.manager';
import {filter, finalize} from 'rxjs/operators';
import {UI} from 'junte-ui';

@Component({
  selector: 'app-leader-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  ui = UI;
  teams: Team[] = [];
  loading: boolean;

  constructor(@Inject(teams_service) private teamsService: ITeamsService,
              private me: MeManager) {
  }

  ngOnInit() {
    this.loading = true;
    this.me.user$.pipe(filter(u => !!u)).subscribe(user => {
      this.teamsService.list(user.id, [TeamMemberRole.leader, TeamMemberRole.watcher])
        .pipe(finalize(() => this.loading = false))
        .subscribe((paging) => this.teams = paging.results);
    });
  }

}
