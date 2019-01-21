import {Inject, Injectable} from '@angular/core';
import {Me} from '../models/me';
import {BehaviorSubject} from 'rxjs';
import {IMeService, me_service} from '../services/me/interface';
import {Config} from 'junte-angular';
import {AppConfig} from '../app-config';
import {UserPermission} from '../models/user';
import {jsonEquals} from '../utils/object';

@Injectable()
export class MeManager {

  user$: BehaviorSubject<Me> = new BehaviorSubject<Me>(null);

  set user(user: Me) {
    if (jsonEquals(this.user, user)) {
      this.user$.next(user);
    }
  }

  get user(): Me {
    return this.user$.getValue();
  }

  constructor(@Inject(me_service) private meService: IMeService,
              @Inject(Config) private config: AppConfig) {
    this.config.authorization$.subscribe(token => {
      if (!!token) {
        this.meService.getUser().subscribe(user => this.user = user,
          () => this.user = null);
      } else {
        this.user = null;
      }
    });
  }

  can(permission: UserPermission) {
    return this.user && this.user.permissions.includes(permission);
  }
}
