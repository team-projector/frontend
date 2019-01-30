import {Component, Inject, OnInit} from '@angular/core';
import {IUsersService, users_service} from '../../../services/users/interface';
import {ObjectLink} from '../../../models/object-link';

@Component({
  selector: 'app-leader-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  users: ObjectLink[] = [];

  constructor(@Inject(users_service) private usersService: IUsersService) {
  }

  ngOnInit() {
    this.usersService.links()
      .subscribe(users => this.users = users);
  }

}
