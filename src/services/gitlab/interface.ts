import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../../models/status';

export interface IGitlabService {

  getStatus(): Observable<Status>;

}

export let gitlab_service = new InjectionToken('gitlab_service');
