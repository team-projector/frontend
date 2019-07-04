import {deserialize, Serializer} from 'serialize-ts';
import {ProjectCard, ProjectGroupCard} from '../models/project';

export class ProjectSerializer implements Serializer<ProjectCard | ProjectGroupCard> {
  serialize(date: ProjectCard | ProjectGroupCard): string {
    throw new Error('Was not implemented');
  }

  deserialize(source: Object): ProjectCard | ProjectGroupCard {
    switch (source['__type__']) {
      case 'ProjectGroup':
        return deserialize(source, ProjectGroupCard);
      case 'Project':
      default:
        return deserialize(source, ProjectCard);
    }
  }
}
