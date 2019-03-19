import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Me} from '../models/me';
import {IMeService, me_service} from '../services/me/interface';

@Injectable()
export class MeUserWithMetricsResolver implements Resolve<Observable<Me>> {

  constructor(@Inject(me_service) private meService: IMeService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Me> {
    return this.meService.getUser(true);
  }
}
