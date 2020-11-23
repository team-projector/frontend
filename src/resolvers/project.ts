import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { environment } from 'src/environments/environment';
import { getMock } from '@junte/mocker';
import { Project } from '../models/project';
import { ProjectGQL } from './project.graphql';

@Injectable({providedIn: 'root'})
export class ProjectResolver implements Resolve<Project> {

  constructor(private projectGQL: ProjectGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Project> {
    const id = route.params['project'];
    const action = environment.mocks
      ? of(getMock(Project, {id: id}))
      : this.projectGQL.fetch({project: id})
        .pipe(map(({data: {project}}) => deserialize(project, Project)));

    return !!id ? action : of(null);
  }
}
