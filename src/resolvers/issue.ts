import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { parse } from 'date-fns';
import { IssuesType } from '../models/issue';

@Injectable()
export class DueDateResolver implements Resolve<Date> {
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Date {
    const dueDate = route.params['due_date'];
    return !!dueDate ? parse(dueDate) : null;
  }
}

@Injectable()
export class IssuesTypeResolver implements Resolve<IssuesType> {
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): IssuesType {
    return route.params['type'] || IssuesType.opened;
  }
}
