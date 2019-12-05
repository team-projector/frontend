import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { parse } from 'date-fns';
import { IssuesType } from 'src/models/enums/issue';

@Injectable()
export class DueDateResolver implements Resolve<Date> {
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Date {
    const dueDate = route.params['dueDate'];
    return !!dueDate ? parse(dueDate) : null;
  }
}

@Injectable()
export class IssuesTypeResolver implements Resolve<IssuesType> {
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): IssuesType {
    return route.params['type'] || null;
  }
}
