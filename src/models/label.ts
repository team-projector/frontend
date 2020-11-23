import { field, model } from 'src/decorators/model';
import { StandardLabel } from 'src/models/enums/standard-label';
import { faker } from '../utils/mocks';

@model()
export class Label {

  @field({
    mock: () => faker.helpers.randomize([
      StandardLabel.toDo,
      StandardLabel.doing,
      StandardLabel.done
    ])
  })
  title: string;

  @field({mock: () => faker.commerce.color()})
  color: string;

  constructor(defs: any = {}) {
    Object.assign(this, defs);
  }

}
