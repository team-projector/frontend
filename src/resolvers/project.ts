import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {deserialize} from 'serialize-ts/dist';
import {UserGQL} from './user.graphql';
import {ProjectGQL} from './project.graphql';
import {Project} from '../models/project';

@Injectable()
export class ProjectResolver implements Resolve<Observable<Project>> {

  constructor(private projectGQL: ProjectGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Project> {
    const id = route.params['project'];

    return !!id ? of(deserialize({id: id}, Project))
      : of(null);

    /*return !!id ? this.projectGQL.fetch({project: id})
        .pipe(map(({data: {project}}) => deserialize(project, Project)))
      : of(null);*/
  }
}