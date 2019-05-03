import {Inject, Pipe, PipeTransform} from '@angular/core';
import {ITeamsService, teams_service} from '../../services/teams/interface';
import {TeamMemberCard} from '../../models/team';
import {Observable} from 'rxjs';
import {Subscriber} from 'rxjs/src/internal/Subscriber';

@Pipe({name: 'teamMembers'})
export class TeamMembersPipe implements PipeTransform {

  constructor(@Inject(teams_service) private teamsService: ITeamsService) {

  }

  transform(team: number): Observable<TeamMemberCard[]> {
    return Observable.create((observer: Subscriber<TeamMemberCard[]>) => {
      this.teamsService.teamMembers(team)
        .subscribe((paging) => observer.next(paging.results));
    });
  }
}
