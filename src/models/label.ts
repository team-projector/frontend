import { field, model } from 'src/decorators/model';
import * as faker from 'faker';

export enum StandardLabel {
  toDo = 'To Do',
  doing = 'Doing',
  done = 'Done'
}

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
