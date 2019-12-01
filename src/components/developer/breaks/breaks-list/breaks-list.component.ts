import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewType } from 'src/components/breaks/breaks.component';
import { BreaksType } from 'src/models/break';
import { User } from 'src/models/user';

@Component({
  selector: 'app-breaks-list',
  templateUrl: './breaks-list.component.html',
  styleUrls: ['./breaks-list.component.scss']
})
export class BreaksListComponent implements OnInit {

  viewType = ViewType;

  @Input()
  user: User;
  type: BreaksType;

  @Output() reloaded = new EventEmitter();

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({user}) => this.user = user);
  }
  // ngOnInit() {
  //   this.route.data.subscribe(({user, type}) =>
  //     [this.user,  this.type] =
  //       [user, type || BreaksType.created]);
  // }

  filtered(state: { type? }) {
    this.router.navigate([state],
      {relativeTo: this.route})
      .then(() => null);
  }

}
