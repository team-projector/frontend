import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserCard } from 'src/models/user';

@Component({
  selector: 'app-team-list-problems-component',
  templateUrl: './problems-list.component.html',
  styleUrls: ['./problems-list.component.scss']
})

export class TeamProblemsListComponent implements OnInit {

  user: UserCard;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({user}) => this.user = user);
  }

}
