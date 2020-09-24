import { Component, Input, OnInit } from '@angular/core';
import { UI } from '@junte/ui';
import { LocalUI } from 'src/enums/local-ui';
import { Me } from 'src/models/user';

@Component({
  selector: 'app-developer-work-breaks',
  templateUrl: './developer-work-breaks.component.html',
  styleUrls: ['./developer-work-breaks.component.scss']
})
export class DeveloperWorkBreaksComponent implements OnInit {

  ui = UI;

  @Input()
  me: Me;

  constructor() { }

  ngOnInit(): void {
  }

}
