import { deserialize, Serializer } from 'serialize-ts';
import { Project, ProjectGroup } from '../models/project';

interface Entity {
  id: string;
}

export class EntitySerializer implements Serializer<Entity> {
  serialize(entity: Entity): string {
    console.log(entity);
    return entity.id;
  }

  deserialize(source: Object): Project | ProjectGroup {
    throw new Error('Was not implemented');
  }
}
