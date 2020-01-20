import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { environment } from 'src/environments/environment';
import { getMock } from 'src/utils/mocks';
import { Project } from '../models/project';
import { ProjectGQL } from './project.graphql';

@Injectable()
export class ProjectResolver implements Resolve<Observable<Project>> {

  constructor(private projectGQL: ProjectGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Project> {
    const id = route.params['project'];
    const action = environment.mocks
      ? of(getMock(Project))
      : this.projectGQL.fetch({project: id})
      .pipe(map(({data: {project}}) => deserialize(project, Project)));

    return !!id ? action : of(null);
  }
}
