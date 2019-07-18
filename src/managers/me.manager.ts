import {Inject, Injectable} from '@angular/core';
import {Me} from '../models/user';
import {BehaviorSubject} from 'rxjs';
import {Config} from 'junte-angular';
import {AppConfig} from '../app-config';
import {jsonEquals} from '../utils/object';
import {graph_ql_service, IGraphQLService} from '../services/graphql/interface';
import {map} from 'rxjs/operators';
import {deserialize} from 'serialize-ts';

const query = `query {
      me {
        id
        name
        glAvatar
        roles
      }
    }`;

@Injectable()
export class MeManager {

  user$: BehaviorSubject<Me> = new BehaviorSubject<Me>(null);

  set user(user: Me) {
    if (!jsonEquals(this.user, user)) {
      this.user$.next(user);
    }
  }

  get user(): Me {
    return this.user$.getValue();
  }

  constructor(@Inject(graph_ql_service) private graphQL: IGraphQLService,
              @Inject(Config) private config: AppConfig) {
    this.config.authorization$.subscribe(token => {
      if (!!token) {
        this.graphQL.get(query)
          .pipe(map(({data: {me}}) => deserialize(me, Me)))
          .subscribe(user => this.user = user);
      } else {
        this.user = null;
      }
    });
  }
}
