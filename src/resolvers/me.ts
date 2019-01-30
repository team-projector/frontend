import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Me} from '../models/me';
import {MeManager} from '../managers/me.manager';
import {filter} from 'rxjs/operators';

@Injectable()
export class MeUserResolver implements Resolve<Observable<Me>> {

  constructor(private me: MeManager) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Me> {
    return Observable.create((observer: any) => {
      this.me.user$.pipe(filter(u => !!u))
        .subscribe(u => {
          observer.next(u);
          observer.complete();
        });
    }) as Observable<Me>;
  }
}
