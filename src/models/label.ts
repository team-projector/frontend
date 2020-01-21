import * as faker from 'faker';
import { field, model } from 'src/decorators/model';
import { StandardLabel } from 'src/models/enums/standard-label';

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

}
