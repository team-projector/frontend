import { Inject, Injectable } from '@angular/core';
import { Me } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { MeManagerGQL } from './me-manager.graphql';
import { AppConfig } from 'src/app-config';
import { equals } from '../utils/equals';

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
              private meManagerApollo: MeManagerGQL) {
    this.config.token$.subscribe(token => {
      if (!!token) {
        this.meManagerApollo.fetch()
          .pipe(map(({data: {me}}) => deserialize(me, Me)))
          .subscribe(user => this.user = user);
      } else {
        this.user = null;
      }
    });
  }
}
