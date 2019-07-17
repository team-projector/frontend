import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {UI} from 'junte-ui';
import {Config} from 'junte-angular';
import {AppConfig} from '../../app-config';
import {MeManager} from '../../managers/me.manager';
import {Router} from '@angular/router';
import {GitLabStatus} from '../../models/graphql/gitlab';
import {UserRole} from '../../models/graphql/user';
import {graph_ql_service, IGraphQLService} from '../../services/graphql/interface';
import {deserialize} from 'serialize-ts';
import {map, tap} from 'rxjs/operators';
import {query} from './dashboard.queries';

const STATUS_TIMEOUT = 60000;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ui = UI;
  userRole = UserRole;
  status: GitLabStatus;

  loading: { [name: string]: boolean } = {};


  @ViewChild('status') statusEl: ElementRef;

  constructor(@Inject(Config) public config: AppConfig,
              @Inject(graph_ql_service) private graphQL: IGraphQLService,
              private router: Router,
              public me: MeManager) {
  }

  logout() {
    this.router.navigate(['/signup/login'])
      .then(() => this.config.authorization = null);
  }

  ngOnInit() {
    this.load();
    setInterval(() => this.load(), STATUS_TIMEOUT);
  }

  load() {
    this.graphQL.get(query).pipe(map(({data: {gitlabStatus}}) =>
      deserialize(gitlabStatus, GitLabStatus), tap(s => console.log(s))))
      .subscribe(status => this.status = status);
  }

  setTheme(theme: string = null) {
    this.loading[theme] = true;
    window['themes'](theme, () => this.loading[theme] = false);
  }

}
