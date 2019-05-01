import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {parse} from 'date-fns';

@Injectable()
export class DueDateResolver implements Resolve<Date> {
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Date {
    const dueDate = route.params['due_date'];
    return !!dueDate ? parse(dueDate) : new Date();
  }
}
