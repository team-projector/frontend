import {deserialize, Serializer} from 'serialize-ts';
import {Project, ProjectGroup} from '../models/project';

export class ProjectSerializer implements Serializer<Project | ProjectGroup> {
  serialize(date: Project | ProjectGroup): string {
    throw new Error('Was not implemented');
  }

  deserialize(source: Object): Project | ProjectGroup {
    switch (source['__type__']) {
      case 'ProjectGroup':
        return deserialize(source, ProjectGroup);
      case 'Project':
      default:
        return deserialize(source, Project);
    }
  }
}
