import {Component, OnInit} from '@angular/core';
import {User} from 'src/models/user';
import {ActivatedRoute} from '@angular/router';
import {UI} from 'junte-ui';

@Component({
  selector: 'app-salaries-list',
  templateUrl: './salaries-list.component.html',
  styleUrls: ['./salaries-list.component.scss']
})

export class SalariesListComponent implements OnInit {

  user: User;
  ui = UI;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({user}) => this.user = user);
  }
}
