import {field, model} from '@junte/mocker-library';

export enum StandardLabel {
  toDo = 'To Do',
  doing = 'Doing',
  done = 'Done'
}

@model()
export class Label {

  @field({mock: '{{label}}'})
  title: string;

  @field({mock: '{{color}}'})
  color: string;

}
