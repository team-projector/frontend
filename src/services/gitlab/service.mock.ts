import { Injectable } from '@angular/core';
import { IGitlabService } from './interface';
import { HttpMockService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import { Status } from '../../models/status';


@Injectable({providedIn: 'root'})
export class GitlabMockService implements IGitlabService {

  constructor(private http: HttpMockService) {
  }

  getStatus(): Observable<Status> {
    return this.http.get('gitlab/get-status.json')
      .pipe(map(obj => deserialize(obj, Status)));
  }

}
