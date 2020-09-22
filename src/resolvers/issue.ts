import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { parseISO } from 'date-fns';
import { IssuesType } from 'src/models/enums/issue';

@Injectable({providedIn: 'root'})
export class DueDateResolver implements Resolve<Date> {
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Date {
    const dueDate = route.params['dueDate'];
    return !!dueDate ? parseISO(dueDate) : null;
  }
}

@Injectable({providedIn: 'root'})
export class IssuesTypeResolver implements Resolve<IssuesType> {
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): IssuesType {
    return route.params['type'] || null;
  }
}
