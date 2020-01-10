import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { AppConfig } from 'src/app-config';
import { environment } from '../environments/environment';
import { Me, User } from '../models/user';
import { getMock } from '../utils/mocks';
import { equals } from '../utils/equals';
import { MeManagerGQL } from './me-manager.graphql';

@Injectable()
export class MeManager {

  user$: BehaviorSubject<Me> = new BehaviorSubject<Me>(null);

  set user(user: Me) {
    if (!equals(this.user, user)) {
      this.user$.next(user);
    }
  }

  get user(): Me {
    return this.user$.getValue();
  }

  constructor(@Inject(AppConfig) private config: AppConfig,
              private meManagerGql: MeManagerGQL) {
    this.config.token$.subscribe(token => {
      if (!!token) {
        (environment.mocks
          ? of(getMock(User))
          : this.meManagerGql.fetch().pipe(map(({data: {me}}) => deserialize(me, Me))))
          .subscribe(user => this.user = user);
      } else {
        this.user = null;
      }
    });
  }
}
