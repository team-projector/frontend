import { Injectable } from '@angular/core';
import { IGitlabService } from './interface';
import { HttpService } from 'junte-angular';
import { Observable } from 'rxjs';
import { deserialize } from 'serialize-ts';
import { map } from 'rxjs/operators';
import { Status } from '../../models/status';

@Injectable({providedIn: 'root'})
export class GitlabService implements IGitlabService {

  constructor(private http: HttpService) {
  }

  getStatus(): Observable<Status> {
    return this.http.get('gitlab/status')
      .pipe(map(obj => deserialize(obj, Status)));
  }

}
