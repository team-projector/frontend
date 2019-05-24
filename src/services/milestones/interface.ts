import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {MilestonesFilter, PagingMilestones} from '../../models/milestone';

export interface IMilestonesService {

  list(filter: MilestonesFilter): Observable<PagingMilestones>;

}

export let milestones_service = new InjectionToken('milestones_service');
