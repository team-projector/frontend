import { deserialize, Serializer } from '@junte/serialize-ts';
import { Project, ProjectGroup } from '../models/project';

export class ProjectSerializer implements Serializer<Project | ProjectGroup> {
  serialize(project: Project | ProjectGroup): string {
    throw new Error('Was not implemented');
  }

  deserialize(source: Object): Project | ProjectGroup {
    switch (source['__typename']) {
      case 'ProjectGroup':
        return deserialize(source, ProjectGroup);
      case 'Project':
      default:
        return deserialize(source, Project);
    }
  }
}
