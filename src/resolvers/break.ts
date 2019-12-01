import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BreaksType } from 'src/models/break';

@Injectable()
export class BreaksTypeResolver implements Resolve<BreaksType> {
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): BreaksType {
    return route.params['type'] || null;
  }
}
