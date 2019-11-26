import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-developer-merge-requests-list',
  templateUrl: './merge-requests-list.component.html',
  styleUrls: ['./merge-requests-list.component.scss']
})

export class DeveloperMergeRequestsListComponent {

  user: User;
  @Output() reloaded = new EventEmitter();

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({user}) => this.user = user);
  }
}
