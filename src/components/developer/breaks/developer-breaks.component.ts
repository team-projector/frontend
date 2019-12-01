import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UI } from 'junte-ui';
import { User } from 'src/models/user';


@Component({
  selector: 'app-developer-breaks',
  templateUrl: './developer-breaks.component.html',
  styleUrls: ['./developer-breaks.component.scss']
})
export class DeveloperBreaksComponent implements OnInit {

  user: User;
  ui = UI;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({user}) => this.user = user);
  }
}

