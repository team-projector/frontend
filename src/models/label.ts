import {field, model} from '@junte/mocker-library';

@model()
export class Label {

  @field({mock: '{{label}}'})
  title: string;

  @field({mock: '{{color}}'})
  color: string;

}
