import {deserialize, Serializer} from 'serialize-ts';
import {ProjectCard, ProjectGroupCard} from '../models/project';

export class ProjectSerializer implements Serializer<ProjectCard | ProjectGroupCard> {
  constructor(private f: string = null) {

  }

  serialize(date: ProjectCard | ProjectGroupCard): string {
    throw new Error('Was not implemented');
  }

  deserialize(source: Object): ProjectCard | ProjectGroupCard {
    switch (source['__type__']) {
      case 'Project':
        return deserialize(source, ProjectCard);
      case 'ProjectGroup':
        return deserialize(source, ProjectGroupCard);
      default:
        throw new Error('Wrong object type');
    }
  }
}
